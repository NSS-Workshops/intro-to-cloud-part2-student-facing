In this chapter we will provide you with a terraform repo that includes all the infrastructure configuration for your rock-of-ages client side setup from Cloud Workshop 1. We will then guide you on running terraform commands again to apply this configuration to your AWS account.  

## Clone and Explore the Rock of Ages Infrastructure Repo 

Fork the following repo to your personal account:

[rock-of-ages-infra](https://github.com/NSS-Workshops/rock-of-ages-infra)

After forking, clone the repo and explore the contents in VSCode. 

In ask mode, use roo (or any llm of your choice) to explain the configurations in s3.tf and cloudfront.tf. See if you can understand how this configuration maps directly to the manual configurations we set up for s3 and cloudfront in workshop 1. 

* [s3 setup](https://nss-workshops.github.io/intro-to-cloud-student-facing/s3-bucket-setup)
* [cloudfront setup](https://nss-workshops.github.io/intro-to-cloud-student-facing/cloudfront-setup)

## Update Variables

You may have noticed that s3.tf references a variable with `var.bucket_name`. However, in variables.tf there is no value yet assigned to bucket name. You have a couple of options here. You could add a default value to the bucket_name variable definition in variables.tf:

```
variable "bucket_name" {
  description = "Name of the S3 bucket (must be globally unique)"
  type        = string
  default     = "your-unique-bucket-name" <---- add this here  
}
```

Or you can add a terraform.tfvars file in the project with this content:

```
bucket_name = "your-unique-bucket-name"

```

I would recommend adding the new terraform.tfvars file. This file is included in .gitignore and even though your bucket name is not sensitive we will want to use this file later in the workshop for sensitive variables such as our database password. 

## Update Outputs

Check out the outputs.tf file and for practice try adding a new output for your s3 bucket name. 

Hint: you will need to use dot notation with the aws resource name ("aws_s3_bucket") along with the locally given name ("frontend"). 

## Configure CLI Access

By now you should have your SSO configuration setup. 

Run 
```bash
aws sso login --profile=intro-to-cloud-part2
```

Run:
```bash
export AWS_PROFILE=intro_to_cloud_part2
```

## Run Terraform Commands

1.  **Initialize Terraform:** In your `rock-of-ages-infra` directory, run:

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


5.  **Verify Outputs:**
    You should now see your s3 bucket name and cloudfront distribution as outputs in your terminal.
    
    Congratulations! You've just set up your entire front end infrastructure for rock-of-ages in a fraction of the time it took to configure manually the first time around. 

## Explore the State File
Now that you have run terraform commands, you may notice a few new files have been created in your project:
* .terraform/*
* terraform.tfstate
* terraform.tfstate.backup

💡 **What's happening here?** These files are crucial for Terraform's operation.
- `.terraform/*`: This directory contains downloaded provider plugins and modules, along with a local backend for state management. It's essential for Terraform to function.
- `terraform.tfstate`: This is the Terraform state file, a critical component that maps real-world resources to your configuration. It tracks the infrastructure managed by Terraform, records metadata, and is used to plan future changes.
- `terraform.tfstate.backup`: Terraform automatically creates a backup of your state file before any operation that might modify it, providing a safety net in case of issues.

**Deep Dive** Use roo on ask mode to explore the terraform.tfstate file in more depth. Example prompt: "Read the terraform.tfstate file and explain to me what it is doing line by line." 


