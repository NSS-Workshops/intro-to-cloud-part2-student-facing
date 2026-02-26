This glossary contains important terms and concepts discussed in Terraform Setup & Core Concepts. Understanding them will help solidify and deepen your understanding.

| Term | Definition |
|------|------------|
| Terraform | a powerful tool that allows you to define and manage your cloud infrastructure using code.
| Infrastructure as Code (IaC) |  is the practice of managing and provisioning cloud infrastructure through machine-readable configuration files rather than manual processes or interactive configuration tools.
| manual provisioning | you tell AWS what to do (e.g., "create an S3 bucket").
| declarative automation | you describe the desired state of your infrastructure (e.g., "there should be an S3 bucket named 'my-app-bucket'").
| Provider | is a plugin that Terraform uses to interact with a cloud service (like AWS, Azure, GCP) or other API.
| Resource | a block that describes a piece of infrastructure. This could be an S3 bucket, a virtual machine, a database, or even a DNS record.
| (Terraform)State | a file (typically terraform.tfstate) that Terraform uses to map real-world infrastructure to your configuration. It tracks the status of your deployed resources.
| Terraform Variables | Variables act as parameters for your Terraform configuration, allowing you to customize aspects of your infrastructure without changing the core configuration files.
