Now you'll get to see what this network setup looks like as infrastructure as code!

In your terraform project, create a file called network.tf and paste these contents:

```

# Use the default VPC
data "aws_vpc" "default" {
  default = true
}

# Get all default subnets in the default VPC
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# Create a security group for ec2
resource "aws_security_group" "ec2_sg" {
  name        = "rock-of-ages-ec2-sg"
  description = "Allow SSH and HTTP"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create a security group for RDS
resource "aws_security_group" "rds_sg" {
  name        = "rock-of-ages-db-sg"
  description = "Allow PostgreSQL connections for Rock of Ages course"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # open for workshop/demo purposes
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rock-of-ages-db-sg"
  }
}

# Create an RDS DB Subnet Group using the default subnets
resource "aws_db_subnet_group" "rock_of_ages" {
  name       = "rock-of-ages-subnet-group"
  subnet_ids = data.aws_subnets.default.ids
  tags = {
    Name = "rock-of-ages-db-subnet-group"
  }
}

```

💡 **What's happening here?**

Let's break down the Terraform code block by block to understand what each section does.

### `data "aws_vpc" "default"`

This block retrieves information about your AWS account's default VPC (Virtual Private Cloud). Instead of creating a new VPC, it allows you to reference the existing default one.

### `data "aws_subnets" "default"`

This block fetches all the default subnets within the previously identified default VPC. Subnets are subdivisions of a VPC, allowing for more organized network architecture.

### `resource "aws_security_group" "ec2_sg"`

This resource creates a security group named "rock-of-ages-ec2-sg" specifically for EC2 instances. Security groups act as virtual firewalls, controlling inbound and outbound traffic.
- **`name`**: A human-readable name for the security group.
- **`description`**: Explains the purpose of the security group.
- **`vpc_id`**: Associates this security group with the default VPC.
- **`ingress` blocks**: Define inbound rules:
    - One rule allows SSH traffic (port 22) from any IP address (`0.0.0.0/0`), enabling secure shell access to your EC2 instances.
    - Another rule allows HTTP traffic (port 80) from any IP address, making your web server accessible.
- **`egress` block**: Defines outbound rules:
    - This rule allows all outbound traffic (`from_port = 0`, `to_port = 0`, `protocol = "-1"`) to any IP address.

### `resource "aws_security_group" "rds_sg"`

This resource creates a security group named "rock-of-ages-db-sg" for your RDS (Relational Database Service) instance.
- **`name`**: A human-readable name for the security group.
- **`description`**: Explains the purpose of this security group, allowing PostgreSQL connections.
- **`vpc_id`**: Associates this security group with the default VPC.
- **`ingress` block**: Defines an inbound rule:
    - It allows PostgreSQL traffic (port 5432) from any IP address (`0.0.0.0/0`). While open for workshop/demo purposes, in a production environment, this should be restricted to known IP addresses or security groups for better security.
- **`egress` block**: Defines an outbound rule, similar to the `ec2_sg`, allowing all outbound traffic.
- **`tags`**: Adds metadata to the security group, making it easier to identify and manage.

### `resource "aws_db_subnet_group" "rock_of_ages"`

This resource creates an RDS DB Subnet Group. This group is essential for deploying an RDS instance across multiple Availability Zones within your VPC, ensuring high availability and fault tolerance.
- **`name`**: A unique name for the DB Subnet Group.
- **`subnet_ids`**: Assigns the default subnets (retrieved earlier) to this subnet group. This allows RDS to deploy instances across these subnets.
- **`tags`**: Adds a name tag for easier identification.


## Run Terraform Commands
You know the drill!

- With the CLI, SSO into your AWS account 
- Run terraform init, validate, plan, and apply commands. 