In your Terraform project, create a file called rds.tf and paste the following:

```
resource "aws_db_instance" "rock_of_ages" {
  identifier              = "rock-of-ages-db"
  engine                  = "postgres"
  instance_class          = "db.t4g.micro"

  allocated_storage       = 20
  max_allocated_storage   = 100
  storage_type            = "gp2"

  db_name                 = var.db_name
  username                = var.db_username
  password                = var.db_password

  publicly_accessible     = true
  skip_final_snapshot     = true
  backup_retention_period = 1

  vpc_security_group_ids  = [aws_security_group.rds_sg.id]
  db_subnet_group_name    = aws_db_subnet_group.rock_of_ages.name

  deletion_protection     = false

  tags = {
    Name = "rock-of-ages-db"
  }
}

```

## Add Database Variables

In variables.tf add the following variables:

```
variable "db_username" {
  description = "Master DB username"
  type        = string
  default     = "rockadmin"
}

variable "db_password" {
  description = "Master DB password"
  type        = string
  sensitive   = true
}

variable "db_name" {
  description = "Initial database name"
  type        = string
  default     = "rockofages"
}
```

Since your database password is sensitive, add the value to terraform.tfvars (Remember this is included in the .gitignore file so it can't be committed to the remote repository)

```
db_password = "your-password"

```

update `your-password` to use any password of your choice

## What's happening here?

This Terraform code block defines an AWS RDS database instance using the `aws_db_instance` resource. Here's a breakdown of its configuration:

*   **`identifier`**: Sets a unique name for the database instance, which is `rock-of-ages-db`.
*   **`engine`**: Specifies that the database will use PostgreSQL.
*   **`instance_class`**: Defines the instance type as `db.t4g.micro`, which is a cost-effective, burstable instance suitable for development and testing.
*   **`allocated_storage`**: Initially allocates 20 GB of storage for the database.
*   **`max_allocated_storage`**: Allows the storage to scale up to 100 GB automatically if needed.
*   **`storage_type`**: Uses `gp2`, which is a General Purpose SSD storage type.
*   **`db_name`**: The name of the initial database created, pulled from a Terraform variable `var.db_name`.
*   **`username`**: The master username for the database, also from a Terraform variable `var.db_username`.
*   **`password`**: The master password for the database, retrieved from a sensitive Terraform variable `var.db_password`.
*   **`publicly_accessible`**: Set to `true`, meaning the database instance can be accessed from outside the VPC (for educational purposes; generally set to `false` in production).
*   **`skip_final_snapshot`**: Set to `true` to prevent a final DB snapshot from being created when the DB instance is deleted (again, typically `false` in production to retain backups).
*   **`backup_retention_period`**: Configured to retain automated backups for 1 day.
*   **`vpc_security_group_ids`**: Associates the database with a specific VPC security group (`aws_security_group.rds_sg.id`) to control network access.
*   **`db_subnet_group_name`**: Assigns the database to a predefined DB subnet group (`aws_db_subnet_group.rock_of_ages.name`), ensuring it is deployed across multiple availability zones for high availability.
*   **`deletion_protection`**: Set to `false`, meaning the database can be deleted without extra confirmation (should be `true` in production to prevent accidental deletion).
*   **`tags`**: Applies a tag with the key `Name` and value `rock-of-ages-db` for identification and organization within AWS.

