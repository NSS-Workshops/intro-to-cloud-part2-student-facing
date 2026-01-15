Now that the load balancing infrastructure is in place there are a few changes we need to make to our api before deploying to the new ec2 instances.

## Add Health Check Endpoints
In your rock-of-ages api project, in the rockapi/views add a file called health_check.py and paste the following:

```python
from django.http import JsonResponse
import requests

def health_check(request):
    return JsonResponse({
        "status": "ok",
        "instance": get_instance_id()
    })

def get_instance_id():
    try:
        token = requests.put(
            "http://169.254.169.254/latest/api/token",
            headers={"X-aws-ec2-metadata-token-ttl-seconds": "21600"},
            timeout=0.2
        ).text

        resp = requests.get(
            "http://169.254.169.254/latest/meta-data/instance-id",
            headers={"X-aws-ec2-metadata-token": token},
            timeout=0.2
        )

        return resp.text
    except Exception as e:
        return "unknown"
```

Then in rockproject/urls.py add the health endpoint to `urlpatterns`. It should look like:

```python
urlpatterns = [
    path('', include(router.urls)),
    path('register', register_user),
    path('login', login_user),
    path('health', health_check),
    path('admin/', admin.site.urls),
]
```

💡 **What's happening here?** A health endpoint is a simple URL (like /health/) that returns a 200 response when an application is running correctly. The load balancer calls this endpoint on each server and only sends real user traffic to the ones that are responding as healthy.

## Update the deploy script
in .github/workflows/deploy.yml update the contents with:

```yml
name: Deploy to EC2

on:
  workflow_dispatch:  # Manual only

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: aws-actions/configure-aws-credentials@v3
        with:
          role-to-assume: ${{ secrets.OIDC_ROLE_TO_ASSUME }}
          aws-region: ${{ secrets.AWS_REGION }}

      - uses: aws-actions/amazon-ecr-login@v2

      - name: Trigger remote deployment on EC2 via SSM
        run: |
          aws ssm send-command \
          --targets "Key=tag:Role,Values=rock-of-ages-api" \
          --document-name "AWS-RunShellScript" \
          --comment "Deploy API via ALB" \
          --parameters commands='[
            "IMAGE=\"${{ secrets.ECR_REGISTRY }}/${{ secrets.ECR_REPOSITORY }}:latest\"",
            "aws ecr get-login-password --region ${{ secrets.AWS_REGION }} | docker login --username AWS --password-stdin ${{ secrets.ECR_REGISTRY }}",
            "docker pull \"$IMAGE\"",
            "docker stop rock-of-ages-api || true",
            "docker rm rock-of-ages-api || true",
            "docker run -d --name rock-of-ages-api -p 80:8000 --restart unless-stopped \
              -e DB_NAME=${{ secrets.DB_NAME }} \
              -e DB_USER=${{ secrets.DB_USER }} \
              -e DB_PASSWORD=${{ secrets.DB_PASSWORD }} \
              -e DB_HOST=${{ secrets.DB_HOST }} \
              -e DB_PORT=${{ secrets.DB_PORT }} \
              \"$IMAGE\""
          ]'
```

💡 **What's happening here?** Remember updating the tags for your ec2 instances with Role = rock-of-ages-api? The only difference we made to the deploy.yml script is now we are setting to targets to any ec2 instances tagged with Key = Role with a value of rock-of-ages-api. See the line `--targets "Key=tag:Role,Values=rock-of-ages-api"`. It is a small change but it makes maintaining our CICD pipelines with the new load balancing infrastructure much easier since we do not have to rely on storing ec2 instance ids in our github secrets. 


## Test it out!
- Push the changes to main and run your github actions. Remember the build and push workflow will run automatically on push and once that is successful you can trigger the deploy action manually. 
- The `alb_dns_name` should have output in your terminal when you ran the terraform commands earlier. Take this url and test it in postman by adding /health to the end to see if you get a 200 status. Try sending the request multiple times and you should see the instance id change in the response body. 

Congratulations! You have successfully deployed a horizontally scalable application to ec2 using an application load balancer. You are one step closer to understanding scalable system design and cloud native architectures! 


## Destroy!
Let's take down our entire infrastructure with the terraform destroy command! This is purely to save resources for NSS since in the next module we won't be working with the rock of ages application at all anymore. 

Go to your terraform project in your CLI and run `terraform destroy`. Note: It will take a minute for the entire infrastructure to come down. 