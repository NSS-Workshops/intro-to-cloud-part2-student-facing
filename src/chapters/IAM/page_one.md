## What is Identity and Access Management (IAM)?
--------------------
Think of IAM as the security system for a large office building. You need to control who enters **(authentication)**, what rooms they can access **(authorization)**, and perhaps restrictions to access certain times or require additional verification for sensitive areas **(conditions)**.

IAM is the security foundation of cloud infrastructure. It answers three fundamental questions:

- Who can access resources? (Authentication)
- What can they do? (Authorization)
- Under what conditions can they do it? (Conditional access)


## Core IAM Components
--------------------
### Identities

![Core Components of AWS IAM - showing Users, Groups, Roles, and Policies in a four-quadrant layout](https://media.geeksforgeeks.org/wp-content/uploads/20250801153343168669/7.webp "AWS IAM Core Components") 

**Users** : Users represent individual people or services that need to interact with your cloud environment.

**Key characteristics:**

- Users are meant for long-term identities. In AWS, for example, you might create a user for each employee who needs console access.
- Each user has a unique identity with long-term credentials
- Can have a password for console access
- Can have access keys for programmatic access (CLI, SDK, API)
- Should map 1:1 to a real person or application

**User Groups**: Groups are collections of users that share the same permissions.

**Why groups matter:** 

- Groups are collections of users that share the same permissions.
- Instead of attaching policies to 50 developers individually, attach one policy(permissions) to the "Developers" group
- Users can belong to multiple groups (a person might be in both "Developers" and "On-Call-Engineers")
- Groups cannot be nested (groups cannot contain other groups)
- Groups make permission management scalable

**Roles**: Roles are identities that can be assumed temporarily.

**Key differences between Roles and Users:**

- Roles don't have long-term credentials (no password, no permanent access keys)
- Roles are assumed by trusted entities (ex. EC2 instances, ECS tasks, S3 buckets)
- When you assume a role, you get temporary security credentials (usually valid for 1-12 hours)
- Multiple entities can assume the same role

**Policies**: Policies are JSON documents that define permissions. They answer: "What actions are allowed or denied on which resources?"

**Here is the anatomy of a policy:**
```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow", // Either "Allow" or "Deny"
          "Action": "s3:GetObject", // What API calls can be made (e.g., s3:GetObject, ec2:StartInstances)
          "Resource": "arn:aws:s3:::my-bucket/*" //Which resources the actions apply to (specified by ARN)
        }
      ]
    }
```

**Types of Policies**

- Manged Policies: Pre packaged policies by AWS
  - Standalone policies that can be attached to multiple users, groups, or roles
  - AWS Managed: Created and maintained by AWS (e.g., "ReadOnlyAccess")
  - Customer Managed: Created by you, reusable across your organization

- Inline Policies: Custom policies written in json
  - Embedded directly into a single user, group, or role
  - Have a strict 1:1 relationship with the identity
  - Deleted when the identity is deleted

### The Principle of Least Privilege
--------------------

What is The Principle of Least Privilege? This is the cornerstone of IAM security: Grant only the permissions required to perform a task, nothing more.

Always start with a minimum set of permissions and grant additional permissions as necessary. Doing so is more secure than starting with permissions that are too lenient and then trying to tighten them later. It is best practice to follow The Principle of Least Privilege from the very beginning, as soon as you start building! 


***Why it matters:***

Limits damage from compromised credentials
Reduces risk of accidental changes
Meets compliance requirements
Ensures you understand what permissions are actually needed

***How to implement:***

Start with nothing: Begin with zero permissions
Add incrementally: Grant specific permissions as needed
Use conditions: Further restrict with time, IP, MFA requirements
Review regularly: Remove unused permissions
Monitor access: Use logging to identify what permissions are actually used

Lets look at two different permission setting. One is bad and the other is good, Can you guess which is which?

***Example 1:*** Allows the entity to perform any S3 action on any S3 resource in the entire account.
``` json 
{
  "Effect": "Allow",
  "Action": "s3:*",
  "Resource": "*"
}
```

***Example 2:*** Allows the entity to only read and write objects within the specific bucket `my-specific-bucket` and nothing else.
```json 
{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::my-specific-bucket/*"
}
```
As you might have noticed, in Example 1, the `actions` and `resources` are set to allow all (aka `*`). This method does not follow The Principle of Least Privilege. 
In Example 2, the `actions` and `resources` allow reading and writing objects in "my-specific-bucket". Note the `/*` in the Resource ARN targets the objects inside the bucket, not the bucket itself.



## Recap & Whats Next?
--------------------
Lets take a second to check if the core concepts of this chapter stuck! After, we discus six basic IAM Best Practices.