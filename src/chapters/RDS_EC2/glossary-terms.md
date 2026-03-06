This glossary contains important terms and concepts discussed in EC2 and RDS in Terraform. Understanding them will help solidify and deepen your understanding.

| Term | Definition | 
|------|------------|
| resource "aws_instance" "api_server" { ... } | A Terraform resource block that defines an EC2 instance. It specifies configuration such as the AMI, instance type, networking, and startup scripts. |
| resource "aws_db_instance" "rock_of_ages" { ... } | A Terraform resource used to create and manage an Amazon RDS database instance. |
| resource "aws_ecr_repository" "api" { ... } | A Terraform resource that creates an Amazon Elastic Container Registry (ECR) repository used to store Docker images. |
| data "aws_caller_identity" "current" {} | This block retrieves information about the AWS account currently being used to run Terraform. It's often used to dynamically get the account ID, which can then be passed to other resources or user_data scripts. |
| data "aws_ami" "amazon_linux_2023" { ... } | This data source dynamically queries for the most recent Amazon Machine Image (AMI) for Amazon Linux 2023. |
| EC2 (Elastic Compute Cloud) | AWS's virtual server service that allows you to run applications on cloud-based machines. |
| RDS (Relational Database Service) | AWS's managed relational database service used to run databases like PostgreSQL without managing the underlying server infrastructure. |
| ECR (Elastic Container Registry) | AWS service used to store and manage Docker container images. |
| AMI (Amazon Machine Image) | A preconfigured template used to launch EC2 instances that includes the operating system and base software configuration. |
| instance_type | Defines the hardware size of an EC2 instance, including CPU and memory capacity (for example `t2.micro`). |
| IAM Instance Profile | A container for an IAM role that can be attached to an EC2 instance, allowing the instance to securely access other AWS services. |
| user_data | A script that runs automatically the first time an EC2 instance launches. It is commonly used to install software or configure the server. |
| templatefile() | A Terraform function that loads a file and replaces variables within it, commonly used for generating user_data scripts. |
| instance_class | Defines the compute and memory capacity of an RDS database instance (for example `db.t4g.micro`). |
| allocated_storage | The amount of storage initially allocated to an RDS database instance. |
| max_allocated_storage | The maximum storage the database is allowed to automatically scale to. |
| publicly_accessible | Determines whether an RDS database can be accessed from outside the VPC. |


