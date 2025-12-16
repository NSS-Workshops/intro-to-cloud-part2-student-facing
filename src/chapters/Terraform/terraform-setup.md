
This chapter will guide you through setting up Terraform on your local machine, configuring AWS SSO login for the CLI, and creating a very simple Terraform project.

---

## 💻 Installing Terraform

Follow the official HashiCorp documentation to install Terraform on your operating system:

[Install Terraform](https://developer.hashicorp.com/terraform/downloads)

After installation, verify Terraform is working by opening a terminal and running:

```bash
terraform --version
```

You should see output similar to:

```
Terraform vX.Y.Z
on your_os_arch
```

---

## Configure AWS CLI Using Session Token

1. Install the aws cli (If you have not already installed):
  -For mac users: `brew install awscli`
  -For windows users [Download the installer from aws](https://awscli.amazonaws.com/AWSCLIV2.msi)
  -Check that the cli is installed with `aws --version`

2. Configure your AWS CLI profile. You can run this from any directory in your terminal.

    ```bash
    aws configure sso
    ```

Follow the prompts to set up your sso profile. You will need the values listed here:
  - You can name the session anything e.g. `terraform-session`
  - If prompted for Sso registration scopes just press enter
  - The start url will be `https://nss-se.awsapps.com/start/` (This will redirect you to aws login in the browser. Login and and click allow access)
  - Choose the `intro_to_cloud_part2` role.
  - Set the region to `us-east-2`.
  - The output format will be `json`.
  - Name the profile after the role `intro_to_cloud_part2`.
  - There should only be one account available to you, the cli should automatically use that account number.

Run:
```bash
export AWS_PROFILE=intro_to_cloud_part2
```

This tells your terminal session to point to your newly created credentials

---

## 🚀 Creating Your First Terraform Project

Now let's create a minimal Terraform project.

1.  **Create a Project Directory:**

    ```bash
    mkdir my-terraform-project
    cd my-terraform-project
    ```

2.  **Create `main.tf`:** Inside the `my-terraform-project` directory, create a file named `main.tf` and add the following content:

    ```terraform
    terraform {
      required_providers {
        aws = {
          source  = "hashicorp/aws"
          version = "~> 5.0"
        }
      }
    }

    provider "aws" {
      region  = "us-east-2"
    }

    resource "aws_s3_bucket" "demo" {
      bucket = "your-bucket-name"
    }
    ```

    **Important:** Replace `your-bucket-name` with a globally unique name for your S3 bucket. S3 bucket names must be unique across all AWS accounts.

💡 **What's happening here?** You're defining your infrastructure in a `main.tf` file using HashiCorp Configuration Language (HCL).
- The `terraform` block declares the required AWS provider and its version constraint.
- The `provider "aws"` block configures the AWS provider, specifying the region.
- The `resource "aws_s3_bucket" "demo"` block defines an S3 bucket named "demo", which Terraform will create in your AWS account.

---

## Run Terraform Commands

1.  **Initialize Terraform:** In your `my-terraform-project` directory, run:

    ```bash
    terraform init
    ```

    This command downloads the necessary AWS provider plugin.

💡 **What's happening here?** `terraform init` initializes a working directory containing Terraform configuration files. It downloads the necessary providers and modules specified in your configuration, making your project ready to run.


2.  **Validate Your Configuration:** It's good practice to validate your Terraform configuration before planning or applying changes.

    ```bash
    terraform validate
    ```

    You should see output similar to:

    ```
    Success! The configuration is valid.
    ```

💡 **What's happening here?** `terraform validate` checks the configuration files in your directory for syntax errors and internal consistency. It ensures your configuration is syntactically valid and semantically consistent without requiring access to remote services or state.


3.  **Plan Your Changes:** To see what Terraform will do without actually making changes, run:

    ```bash
    terraform plan
    ```

    Review the output, which will show that Terraform plans to create an S3 bucket.

💡 **What's happening here?** `terraform plan` creates an execution plan, showing you exactly what Terraform will do to achieve the desired state defined in your configuration. It's a "dry run" that helps you understand potential changes before they are applied.


4.  **Apply Your Changes:** To create the S3 bucket in AWS, run:

    ```bash
    terraform apply
    ```

    Type `yes` when prompted to confirm the creation.

💡 **What's happening here?** `terraform apply` executes the actions proposed in a Terraform plan. After reviewing the plan, you confirm the operation, and Terraform provisions or modifies the resources in your cloud environment (in this case, creating an S3 bucket).


5.  **Verify Resource Creation:**
    You can check in the AWS Management Console or via the AWS CLI:
    ```bash
    aws s3 ls 
    ```
    You should see your new S3 bucket listed.

💡 **What's happening here?** This step confirms that the S3 bucket was successfully created and is visible in your AWS account. It demonstrates how to verify the infrastructure changes directly in AWS, either through the console or the CLI.


6.  **Clean Up (Optional):** To destroy the resources created by Terraform, run:

    ```bash
    terraform destroy
    ```

    Type `yes` when prompted to confirm the destruction.

💡 **What's happening here?** `terraform destroy` tears down all the infrastructure resources managed by your Terraform configuration. It's crucial for cleaning up resources after testing or when a project is no longer needed, helping to avoid unnecessary cloud costs.



---

## What We've Accomplished

In this chapter, you've:
- Installed Terraform on your local machine.
- Configured AWS CLI for SSO login.
- Created your first Terraform project to provision an S3 bucket.
- Learned about essential Terraform commands like `init`, `validate`, `plan`, `apply`, and `destroy`.
