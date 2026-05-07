
Welcome to the **Intro to Cloud Part 2** course! By the end of this workshop, you'll understand how to define and manage infrastructure using Terraform. You will gain a deeper understanding of how cloud systems are designed, secured, and scaled.  
This workshop also introduces key concepts like serverless services and event-driven architecture, laying the foundation for transitioning into fully cloud-native systems in the next phase of the course. This is a major step in your journey towards thinking like real cloud engineers! 


## Growing Pains!

<iframe width="560" height="315" src="https://www.youtube.com/embed/nhSdljm909Y?si=NxZOxw1pFmM9OX2m" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

*Alright! I got something to say!*
Def Leppard's Rock of Ages Application is becoming mega popular and the team is growing fast! Managing all these cloud services manually is becoming cumbersome! We need to upgrade our devops practices and pipelines to use infrastructure as code (Terraform) to reduce human errors.   

## 📝 Summary

Here’s what you’ll learn:

- What **Infrastructure as Code (IaC)** is and why it matters
- How to use **Terraform** to define, plan, and apply cloud resources
- How cloud **networking** works, including VPCs, subnets, route tables, and security groups
- How to manage access and permissions with **IAM** — users, roles, policies, and the principle of least privilege
- How to provision **EC2** and **RDS** instances using Terraform
- What **load balancing** is and how to distribute traffic across multiple instances with an **Application Load Balancer (ALB)**
- How to scale applications horizontally and keep them highly available
- What **serverless computing** is and how **AWS Lambda** enables event-driven architecture
- How to trigger Lambda functions from events like S3 uploads, API Gateway calls, and more

You’ll work hands-on with **Amazon Web Services (AWS)** including:
- **Terraform** (Infrastructure as Code tooling)
- **VPC** (Virtual Private Cloud)
- **IAM** (Identity and Access Management)
- **EC2** (Elastic Compute Cloud)
- **RDS** (Relational Database Service)
- **ALB** (Application Load Balancer)
- **Lambda** (Serverless Functions)

You’ll build a working vocabulary of cloud-related terms so you can talk tech with confidence.




## 🗓️ Course Structure

- **Live Zoom Sessions**: 2 sessions per week, each 2 hours long
- **Slack Channel**: For discussions, announcements 
    - Slack Channel: Join the conversation, ask questions, and stay updated.
    Look for: #cloud-deployment-fundamentals-{your cohort number} — for example, Cohort One = #cloud-deployment-fundamentals-01
- **Session Format**:
  - **Hour 1**: Learn core concepts and collaboratively set up resources in the cloud (instructor-supported)
  - **Hour 2**: Instructor-led walkthroughs, with discussion and deeper insights
- **How to reach us**
  - Got a question? The #help channel on Slack is the perfect place to ask!

---
## 📚 Session Breakdown

There will be seven class sessions held on Zoom.


#### Session 1: Introduction and Terraform Setup
- What is Infrastructure as Code (IaC)?
- Why use Terraform?
- Terraform workflow: Write, Plan, Apply
- Key Terraform concepts: Providers, Resources, and State
- Install Terraform and configure the AWS CLI
- AWS SSO setup
- Create your first Terraform project (S3 bucket)
- Essential Terraform commands: init, validate, plan, apply, destroy

#### Session 2: Terraform Expanded and Client Side Infrastructure Setup
- Terraform state management deep dive
- Working with variables and tfvars files
- Managing sensitive values
- Client side infrastructure setup

#### Session 3: IAM Basics and Permissions
- Core IAM components: Users, Groups, Roles, and Policies
- Authentication vs. Authorization
- Policy anatomy and types (Managed vs. Inline)
- The Principle of Least Privilege
- IAM best practices
- Implementing IAM roles and instance profiles with Terraform

#### Session 4: Networking
- What is a Virtual Private Cloud (VPC)?
- VPC components: subnets, route tables, and network gateways
- What are Security Groups?
- CIDR notation and inbound/outbound rules
- Implementing networking resources with Terraform
- Reading and diagramming cloud network architecture

#### Session 5: EC2 and RDS in Terraform
- Provisioning EC2 instances with Terraform
- AMI selection and instance types
- User data scripts for instance initialization
- Configuring RDS (PostgreSQL) with Terraform
- Managing database credentials with Terraform variables
- DB subnet groups and security group configuration
- Full deployment walkthrough

#### Session 6: Load Balancing Fundamentals
- Why load balancing matters: availability, scalability, and performance
- Vertical vs. horizontal scaling
- Target groups and health check endpoints
- Configuring an Application Load Balancer (ALB) with Terraform
- Attaching EC2 instances to a load balancer
- API updates to support multi-instance deployments

#### Session 7: Event-Driven Architecture and Lambda
- What is event-driven architecture?
- Producers and consumers pattern
- Synchronous vs. asynchronous design
- What is AWS Lambda?
- Lambda function basics: runtimes, event objects, and execution roles
- Lambda triggers: S3, API Gateway, SQS, and more
- Hands-on: Deploy a Lambda function via GitHub Actions

---

## Course Completion Requirements
- Attendance:  
    - An 80% attendance rate is expected. Students must inform the instructor of any planned absence. 
    - Students who miss two consecutive sessions without prior notification to the instructor will be considered dropped from the course. 
- Final Assessment: one-on-one meeting with an instructor
    - Students will be required to show that they have set up the AWS services covered throughout the course. 
    - Students will answer a few "interview" questions to show that they can discuss what they've learned and use the vocabulary correctly. We are not expecting mastery just a basic understanding of the concepts. 
