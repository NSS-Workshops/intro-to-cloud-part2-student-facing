## IAM: Best Practices
--------------------
Following IAM best practices is essential for protecting your AWS infrastructure from breaches, unauthorized access, and costly security incidents. These six foundational practices will help you build a secure cloud environment by controlling who can access what, and under what conditions.

**1. Implement Least Privilege:**
Remember: implement least privilege from day one and follow these guidelines as you build.

- Start with zero permissions - Begin with no access and add specific permissions as needed
- Be specific with actions - Use `s3:GetObject` instead of `s3:*`
- Be specific with resources - Use exact ARNs instead of `"Resource": "*"`
- Use conditions - Add IP restrictions, time-based access, MFA requirements, or tag-based conditions
- Review regularly - Audit what permissions are actually being used and remove unnecessary ones
- Requires two factors: password (something you know) + code from device (something you have).


**2. Root Account Protection:**
What is the Root Account?
The root account has complete, ***unrestricted access*** to everything in your AWS account. It cannot be limited by any policy.

How to Protect It:
- Enable MFA immediately - Requires password + code from phone/hardware token
- Don't use root for daily tasks - Create IAM users with appropriate permissions instead
- Lock away credentials - Store in safe or secure password manager
- Delete root access keys - Root should never have programmatic access
- Set up account contacts - Configure alternate contacts for account recovery


**3. Use Roles for Applications:**
Why?
Hardcoded access keys in applications don't expire, get committed to Git, and create security risks.

- Create an IAM role with the necessary permissions
- Attach the role to your EC2 instance, Lambda function, or other service
- The service automatically receives temporary credentials that rotate automatically


**4. Enable MFA for Privileged Users:**
What is MFA?
Multi-factor authentication requires something you know (password) and something you have (phone, hardware token) to authenticate.

Where to Require MFA:
- All human users with console access
- Any user with elevated privileges
Root account (mandatory)

**5. Rotate Credentials Regularly:**
For IAM Users with Access Keys Rotate every 90 days (or less)

AWS allows two active access keys per user for zero-downtime rotation:
- Create a second access key
- Update applications to use the new key
- Test that the new key works
- Deactivate the old key
- Monitor for any failures
- Delete the old key

For Passwords

- Enforce password expiration policies
- Require strong passwords (length, complexity)
- Prevent password reuse


**6. Use IAM Groups for Permission Management:**
Why Groups Matter?
Instead of attaching policies to users individually, attach one policy to a group. This makes permission management scalable.

Group-Based Workflow:
- Create groups based on job functions: Developers, DataAnalysts, SecurityTeam, ReadOnly
- Attach policies to groups
- Add users to appropriate groups
- When someone's role changes, just change their group membership



