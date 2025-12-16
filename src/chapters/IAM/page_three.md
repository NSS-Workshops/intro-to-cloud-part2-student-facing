Now you'll get to see what our IAM setup looks like as infrastructure as code!

In your terraform project, create a file called iam.tf and paste these contents:

```
#############################
# IAM Role for EC2 Access
#############################
resource "aws_iam_role" "ec2_access_role" {
  name = "Ec2AccessRole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}
#############################
# Attach ECR Read-Only Policy
#############################
resource "aws_iam_role_policy_attachment" "ecr_readonly" {
  role       = aws_iam_role.ec2_access_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}
#############################
# Attach SSM Access Policy
#############################
resource "aws_iam_role_policy_attachment" "ssm_core" {
  role       = aws_iam_role.ec2_access_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}
#############################
# Create Instance Profile
#############################
resource "aws_iam_instance_profile" "ec2_access_instance_profile" {
  name = "Ec2AccessRoleInstanceProfile"
  role = aws_iam_role.ec2_access_role.name
}
#############################
# GitHub OIDC Provider
#############################
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
  client_id_list = [
    "sts.amazonaws.com"
  ]
  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1" # GitHub's OIDC thumbprint
  ]
}
#############################
# Trust Policy for GitHub OIDC
#############################
data "aws_iam_policy_document" "github_oidc_trust" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]
    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }
    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_org}/*"]
    }
  }
}
#############################
# IAM Role
#############################
resource "aws_iam_role" "github_oidc" {
  name               = "github_oidc"
  assume_role_policy = data.aws_iam_policy_document.github_oidc_trust.json
  description        = "GitHub OIDC role"
}
#############################
# Attach AWS Managed Policies
#############################
locals {
  managed_policies = [
    "arn:aws:iam::aws:policy/AmazonEC2FullAccess",
    "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess",
    "arn:aws:iam::aws:policy/AmazonSSMFullAccess",
    "arn:aws:iam::aws:policy/AmazonS3FullAccess",
    "arn:aws:iam::aws:policy/CloudFrontFullAccess"
  ]
}
resource "aws_iam_role_policy_attachment" "github_oidc_managed" {
  for_each = toset(local.managed_policies)
  role       = aws_iam_role.github_oidc.name
  policy_arn = each.value
}
```


---

## What's Happening Here?

Let's break it down block by block.

### `resource "aws_iam_role" "ec2_access_role"`

This creates an **IAM Role for EC2** to assume:
- **`name`**: Human-readable role name.
- **`assume_role_policy`**: Grants EC2 permission to assume this role using STS.

---

### `aws_iam_role_policy_attachment` blocks

These attach **managed AWS policies** to the EC2 role:
- **ECR Read-Only**: Allows pulling Docker images from ECR.
- **SSM Managed Instance Core**: Enables Systems Manager features on EC2 instances.

---

### `aws_iam_instance_profile`

This creates an **instance profile** for the EC2 role, which allows EC2 instances to assume the role at launch.

---

### `aws_iam_openid_connect_provider "github"`

This registers **GitHub as an OIDC provider** in AWS:
- **`url`**: GitHub Actions token endpoint.
- **`client_id_list`**: Allowed audiences (STS).
- **`thumbprint_list`**: GitHub certificate thumbprint.

---

### `data "aws_iam_policy_document" "github_oidc_trust"`

This builds a **trust policy** for the GitHub OIDC role:
- Allows GitHub Actions workflows to assume the role.
- Restricts access to repos under your organization (`${var.github_org}`).

---

### `resource "aws_iam_role" "github_oidc"`

Creates the **IAM role for GitHub OIDC** using the trust policy above.

---

### `locals.managed_policies` + `aws_iam_role_policy_attachment "github_oidc_managed"`

Attaches **multiple AWS managed policies** to the GitHub OIDC role:
- EC2, ECR, SSM, S3, CloudFront full access.
- Uses `for_each` to iterate over the policy ARNs.

Note: 
In Terraform, locals are a way to define named values or expressions that you can reuse throughout your configuration. They are like variables, but they are read-only and only exist within the module where they are defined. Locals help make your code cleaner, avoid repetition, and simplify maintenance.

---
## Update variables.tf

In your `variables.tf` file, add this code block and update the default value.

```
variable "github_org" {
  type        = string
  description = "GitHub organization or username"
  default     = "JaneDoe" #Change to your github username
}
```

---

## Run Terraform Commands
With the CLI, SSO into your AWS account, then run Terraform commands

1. `terraform init` – initialize the project  
2. `terraform validate` – check for syntax errors  
3. `terraform plan` – review what will be created  
4. `terraform apply` – create resources in AWS


