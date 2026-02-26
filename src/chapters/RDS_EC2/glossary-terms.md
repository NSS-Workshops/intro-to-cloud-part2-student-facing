This glossary contains important terms and concepts discussed in EC2 and RDS in Terraform. Understanding them will help solidify and deepen your understanding.

| Term | Definition | 
|------|------------|
| data "aws_caller_identity" "current" {} | This block retrieves information about the AWS account currently being used to run Terraform. It's often used to dynamically get the account ID, which can then be passed to other resources or user_data scripts. 
| resource "aws_instance" "api_server" { ... } | This is the core resource block that defines the EC2 instance. 
| data "aws_ami" "amazon_linux_2023" { ... } | This data source dynamically queries for the most recent Amazon Machine Image (AMI) for Amazon Linux 2023. 
| data "aws_ami" "amazon_linux_2023" { ... } | This data source dynamically queries for the most recent Amazon Machine Image (AMI) for Amazon Linux 2023. 
