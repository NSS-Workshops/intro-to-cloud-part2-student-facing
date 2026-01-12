Now that you have your IAM and Networking in place, it's time to complete your full stack Terraform infrastructure with EC2 and RDS!


## The ECR Configuration
Remember we need to create an ECR repository to save our docker images to our AWS account. Create a file in your terraform project called ecr.tf and paste:

```
resource "aws_ecr_repository" "api" {
  name                 = "rock-of-ages-api"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}
```
💡 **What's happening here?**
This Terraform code defines the necessary AWS resources to create an ECR repository.

- `name`: Name of repository 
- `image_tag_mutability`: This controls whether Docker tags such as `latest` can be overwritten. It means we are able to push new images with the same tag.
-  `force_delete`: This tells Terraform "If I destroy this repository, delete it even if it still contains images." By default, AWS will NOT delete an ECR repository if it still has images inside it. This ensures all resources are deleted if we run `terraform destroy`. 

## The EC2 Configuration

In your Terraform project, create a file called ec2.tf and paste the following:

```
data "aws_caller_identity" "current" {}

resource "aws_instance" "api_server" {
  ami                    = aws_ami.amazon_linux_2023.id
  instance_type          = "t2.micro"
  iam_instance_profile   = aws_iam_instance_profile.ec2_access_instance_profile.name

  subnet_id              = data.aws_subnets.default.ids[0]

  # Attach SG to instance
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]

  associate_public_ip_address = true

  user_data = templatefile(
    "${path.module}/user_data.sh",
    { account_id = data.aws_caller_identity.current.account_id }
  )

  tags = {
    Name = "rock-of-ages-instance"
  }
}



data "aws_ami" "amazon_linux_2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023*kernel-6.1*"]
  }
}

```

💡 **What's happening here?**

This Terraform code defines the necessary AWS resources to launch an EC2 instance.

- **`data "aws_caller_identity" "current" {}`**: This block retrieves information about the AWS account currently being used to run Terraform. It's often used to dynamically get the account ID, which can then be passed to other resources or `user_data` scripts.

- **`resource "aws_instance" "api_server" { ... }`**: This is the core resource block that defines the EC2 instance:
    - `ami`: Specifies the Amazon Machine Image (AMI) to use. Here, it references `aws_ami.amazon_linux_2023.id`, meaning it will use the ID of the Amazon Linux 2023 AMI dynamically looked up elsewhere in the configuration.
    - `instance_type`: Sets the size of the EC2 instance, in this case, a `t2.micro`, which is eligible for the AWS free tier.
    - `iam_instance_profile`: Attaches an IAM instance profile (defined elsewhere as `aws_iam_instance_profile.ec2_access_instance_profile`) to the EC2 instance. This grants the instance specific AWS permissions, such as allowing it to interact with other AWS services.
    - `subnet_id`: Assigns the EC2 instance to a specific subnet within a VPC. It's configured to use the first available subnet from a default set of AWS subnets (`data.aws_subnets.default.ids[0]`).
    - `vpc_security_group_ids`: Associates one or more security groups with the instance. The `aws_security_group.ec2_sg.id` implies a security group named `ec2_sg` is defined elsewhere to control inbound and outbound traffic.
    - `associate_public_ip_address`: Set to `true` to ensure the instance receives a public IPv4 address, making it accessible from the internet (if security groups allow).
    - `user_data`: This is a script that runs when the EC2 instance first launches. It uses `templatefile` to render a `user_data.sh` script, passing the AWS account ID into it. This is commonly used for initial setup, installing software, or configuring the instance.
    - `tags`: Applies metadata tags to the instance, making it easier to identify and manage in AWS. The `Name` tag is set to "rock-of-ages-instance".

- **`data "aws_ami" "amazon_linux_2023" { ... }`**: This data source dynamically queries for the most recent Amazon Machine Image (AMI) for Amazon Linux 2023.
    - `most_recent = true`: Ensures that the latest available AMI matching the filters is selected.
    - `owners = ["amazon"]`: Specifies that AMIs owned by Amazon should be considered.
    - `filter`: Narrows down the search for the AMI based on its `name`, looking for names starting with `al2023-ami-2023` and containing `kernel-6.1`. This ensures the correct version of Amazon Linux 2023 is used.

Together, these blocks set up a basic, publicly accessible EC2 instance running Amazon Linux 2023, with initial setup performed by a user data script and appropriate IAM permissions.

## Add the bash Script

Create another file called user_data.sh and paste the following:

```
#!/bin/bash
yum update -y

# Install Docker
dnf install docker -y
service docker start
usermod -a -G docker ec2-user

# Reconnect permissions later
newgrp docker <<EOF

EOF
```

💡 **What's happening here?**

Remember installing docker on the ec2 instance during the first workshop? 

[Workshop One EC2 Setup](https://nss-workshops.github.io/intro-to-cloud-student-facing/ec2-setup)

This bash script is referenced by your terraform config and runs the same commands to install docker your ec2 instance. 

## What is an AMI?

An **AMI**, which stands for **Amazon Machine Image**, is like a pre-configured template for your EC2 instances (virtual servers) in AWS. Think of it as a snapshot of a computer's operating system, applications, and configurations, all bundled into a single package.

When you launch an EC2 instance, you have to choose an AMI. It determines the initial state of your server, including:

- **Operating System:** (e.g., Amazon Linux, Ubuntu, Windows Server)
- **Software:** Any pre-installed applications (e.g., web servers, databases, programming runtimes).
- **Configurations:** Settings like users, permissions, and network configurations.

**Why are AMIs useful?**

1.  **Quick Start:** Instead of manually installing an OS and all necessary software every time you launch a new server, an AMI provides a ready-to-go environment.
2.  **Consistency:** All instances launched from the same AMI will be identical, ensuring consistency across your fleet of servers.
3.  **Customization:** You can create your own custom AMIs from existing EC2 instances. This is great for baking in your specific application code, security patches, or company-standard configurations, so every new server you launch is perfectly tailored to your needs.
4.  **Security:** AWS and other trusted sources provide secure, hardened AMIs, reducing the effort needed to secure your instances.

In simpler terms, an AMI saves you time and effort by giving you a standardized, pre-built foundation for your virtual servers, allowing you to quickly deploy and scale your applications.
