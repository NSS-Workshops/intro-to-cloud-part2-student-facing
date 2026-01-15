Now lets update our Terraform project to setup load balancing for your rock of ages api!

## Update network.tf
Replace your current network.tf file with:

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

  #security groups updated for load balancing 
  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    security_groups = [aws_security_group.alb_sg.id] 
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create a security group for ALB added for load balancing
resource "aws_security_group" "alb_sg" {
  name        = "rock-of-ages-alb-sg"
  description = "Allow HTTP traffic to ALB"
  vpc_id      = data.aws_vpc.default.id

  ingress {
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

  tags = {
    Name = "rock-of-ages-alb-sg"
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

resource "aws_lb" "application_load_balancer" {
  name               = "rock-of-ages-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = data.aws_subnets.default.ids

  tags = {
    Name = "rock-of-ages-alb"
  }
}

resource "aws_lb_target_group" "api_tg" {
  name     = "rock-of-ages-api-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = data.aws_vpc.default.id

  health_check {
    path                = "/health/"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 15
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }

  tags = {
    Name = "rock-of-ages-api-tg"
  }
}


resource "aws_lb_listener" "http_listener" {
  load_balancer_arn = aws_lb.application_load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api_tg.arn
  }
}

```
**What has changed?** 

- **Application Load Balancer**: The resource "aws_lb" "application_load_balancer" is the load balancer itself. It also uses the default subnets and will be open to internet traffic (hence internal = false). There are different types of load balancers such as network load balancers which we won't get into in this course. Application load balancers are used in our case because they understand HTTP traffic and are aware of health check endpoints. 
- **ALB Listener**: The resource "aws_lb_listener" "http_listener" creates an HTTP listener on the Application Load Balancer that accepts incoming traffic on port 80. Every request that reaches the ALB is forwarded to the api_tg target group, which then routes it to one of the healthy EC2 instances.
- **ALB Security Group**: Remember security groups are rules that determine which internet traffic is allowed in your services. The resource "aws_security_group" "alb_sg" configuration allows all HTTP internet traffic into your Application Load Balancer. 
- **Target Group**: The resource "aws_lb_target_group" "api_tg" tells the Application Load Balancer which EC2 instances are allowed to receive traffic and how to decide if they’re healthy. The ALB will send HTTP requests to port 80 on each registered EC2 and repeatedly call /health/; only instances that return HTTP 200 twice in a row are considered healthy and will receive user traffic.
- Additionally we have updated the ingress rules on our ec2 security group to only allow traffic from the ALB security group. Previously we were allowing traffic from anywhere on the internet. Look at this block:

```
ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    security_groups = [aws_security_group.alb_sg.id] 
  }

```

## Update ec2.tf
replace your current ec2.tf file with:

```
resource "aws_instance" "api_server" {
  count                  = 2 
  ami                    = data.aws_ami.amazon_linux_2023.id
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
    Name = "rock-of-ages-instance-${count.index}"
    Role = "rock-of-ages-api"
  }
}

resource "aws_lb_target_group_attachment" "api" {
  count            = length(aws_instance.api_server)
  target_group_arn = aws_lb_target_group.api_tg.arn
  target_id        = aws_instance.api_server[count.index].id
  port             = 80
}


data "aws_ami" "amazon_linux_2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023*kernel-6.1*"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
}
```

**What has changed?** 
- We've added count = 2 in our ec2 configuration to indicate we want to create 2 ec2 instances
- The ec2 instances are are attached to our ALB target group with the resource "aws_lb_target_group_attachment" "api" configuration. Without this, the target group would not know which ec2 instances to route traffic to
- There is also a small addition to the tags we've created for our ec2 instances. Role = "rock-of-ages-api" has been added to the tags. This will make it easier later when we update our CICD github actions file in the api codebase because we can target the ec2 instances based on the tag rather than the instance ids. This removes the need to configure instance ids in our repository secrets. 

## Run Terraform Commands
You know the drill!

- With the CLI, SSO into your AWS account 
- Run terraform init, validate, plan, and apply commands. 


Verify in the aws console that you can now see two ec2 instances. You can also view your load balancer by going to the ec2 console and clicking load balancers on the menu on the left. 

Next, we will update our github actions in our api to deploy our application to multiple ec2 instances rather than one. 