Now its time to bring everything together! We will walk you through applying the terraform infrastructure and reusing your CICD pipelines to get your Rock of Ages application up and running!

## Update Outputs
This is a good opportunity to see the value of the outputs.tf file. You are going to need to update some of your Github Actions secrets values in the upcoming steps. To make that easier, lets output the values we know we will need. 

Add this to outputs.tf:

```
output "aws_cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.frontend.id
}

output "ec2_public_dns" {
  value       = aws_instance.api_server.public_dns
  description = "Public DNS name of the EC2 instance"
}

output "ecr_registry_url" {
  value = "${aws_ecr_repository.api.registry_id}.dkr.ecr.${var.aws_region}.amazonaws.com"
}

output "ec2_instance_id" {
  value = aws_instance.api_server.id
}

output "ecr_repository" {
  value = aws_ecr_repository.api.name
}

output "db_host" {
  description = "PostgreSQL database endpoint"
  value       = aws_db_instance.rock_of_ages.address
}

output "db_name" {
  description = "database name"
  value       = aws_db_instance.rock_of_ages.name
}

output "db_user" {
  description = "database username"
  value       = aws_db_instance.rock_of_ages.db_username
}

output "github_oidc_role_arn" {
  description = "ARN of the IAM role used by GitHub OIDC"
  value       = aws_iam_role.github_oidc.arn
}

```

## Apply the Terraform

With the CLI, SSO into your AWS account, then run Terraform commands

1. `terraform init` – initialize the project  
2. `terraform validate` – check for syntax errors  
3. `terraform plan` – review what will be created  
4. `terraform apply` – create resources in AWS

## Run the Client Github Actions

1. In your rock-of-ages-client repository update the following github actions secrets using the corresponding values in your CLI outputs:


- CLOUDFRONT_DISTRIBUTION_ID
- OIDC_ROLE_TO_ASSUME
- S3_BUCKET_NAME

2. In the rock of ages client project update the .env file with the CLI output value for `ec2_public_dns`

3. Push to main and let your github actions workflow complete

4. Test that your client side application has deployed by visiting the cloudfront domain. The value of `cloudfront_domain` in your CLI output. **Note** The site wont be fully functional yet until we deploy the API next.

## Run the Server Side Github Actions 

1. In your rock-of-ages-api repository update the following github actions secrets using the corresponding values in your CLI outputs

- DB_HOST
- DB_NAME
- DB_PASSWORD (this is not included in outputs)
- DB_USER
- EC2_INSTANCE_ID
- ECR_REGISTRY
- ECR_REPOSITORY
- OIDC_ROLE_TO_ASSUME

2. Make a push to main to kick off the github actions workflow (You may need to add a small comment somewhere in the project to allow the push). Reference [Workshop One EC2 deployment](https://nss-workshops.github.io/intro-to-cloud-student-facing/ec2-action) to remember the steps. **Hint:** Scroll down to the section titled "Trigger and Monitor Workflow Execution"

3. Once the github actions build/push and deploy workflows have completed, revisit your cloudfront domain and test that your application is fully functional! 

**Congratulations!** Now you can see the full value of terraform and how quickly this application and it's entire infrastructure can be applied and deployed on AWS. 

