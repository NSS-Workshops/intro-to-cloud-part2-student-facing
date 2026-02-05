Let's create our very own lambda function that responds to an s3 upload event trigger!

## Fork the Repo 

Fork this repo into your own repository and clone it locally. 
[Hello-Lambda!](https://github.com/NSS-Workshops/hello-lambda)

## Explore the Project 

There are three main parts of this project:

* The lambda function itself in `lambda_function.py`
* The terraform files stored in the `infra` directory
* Github actions defined in `.github/workflows/deploy.yml` 

It is common to have the infrastructure (terraform) related to a specific project stored in that project's repo and integrated into the github actions CICD pipeline. This project is an example of that exact setup. Using roo or any other LLM, explore the project files and ask for explanations about what each configuration is doing. 

## Set up OIDC

If you tried running the github actions up until now, you may have noticed an error in finding AWS credentials. If you remember, we ran `terraform destroy` at the end of the last session, which wiped out our github_oidc role in IAM. 

On a professional development team you will not have all of your terraform files in one place. Teams usually keep terraform configurations that are used across multiple services separate from configurations specific to a single service. 

For this project, you will need the github_oidc role in place in order for your github actions to work. To do this, set up a new terraform project locally and transfer any terraform related to the OIDC role from your previous project to this new project. Here's some hints:

* You'll need main.tf 
* You'll need anything related to oidc from iam.tf
* It'll be up to you how you want to handle variables and outputs in your new project. 
* The managed policies will need to be updated to:

```
locals {
  managed_policies = [
    "arn:aws:iam::aws:policy/AWSLambda_FullAccess",
    "arn:aws:iam::aws:policy/AmazonS3FullAccess",
    "arn:aws:iam::aws:policy/IAMFullAccess"
  ]
}
```

Run your terraform commands locally to create the oidc role again in your account. Then use the github_oidc role arn and store it as the OIDC_ROLE_TO_ASSUME secret in your hello-lambda repo.


## Deploy your Lambda

1. Push to main to trigger the github actions workflow
2. In the actions tab verify that your jobs ran successfully
3. Go to Lambda in the AWS console and verify that your lambda was created. 

## Trigger your Lambda

You may have noticed this in the lambda terraform definition:

```
filter_prefix       = "uploads/"
filter_suffix       = ".txt"
```

This means that our lambda will only be triggered by .txt files uploaded to the uploads folder in our s3 bucket. You do not need these definitions if you want the lambda to respond to any object dropped in the bucket but we've added it for demonstration purposes to show how you can add filtering logic on the event itself. 

1. Find your bucket in the s3 console
2. Create a folder called uploads and upload any .txt file into it. 
3. To check that your lambda was triggered, go back to the lambda console and click on the Monitor tab. You should see a cloudwatch metrics dashboard with various graphs showing that your lambda was invoked

## View logs

1. While still in the monitor tab click the View CloudWatch logs button. This will take you to the CloudWatch console for your lambda and you will see Log Streams. 
2. Select the top log stream and you should see all of the print statements output from your Lambda function 

## Stretch Goals

If you have extra time, try updating your lambda function to do operations on the file that you uploaded. Use an LLM for help and get creative! 

note: because we are using github actions to run our terraform, there is no state file being stored (terraform.tfstate when you run terraform locally). You will have to manually delete resources between each github actions workflow run. On a real development team the terraform would use backend state usually using s3 with a dynamodb state locking table. Feel free to research this setup, its just more involved than the purposes of this workshop. 