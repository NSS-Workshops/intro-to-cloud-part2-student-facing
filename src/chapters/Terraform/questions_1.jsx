import { QUESTION_TYPES } from '@nss-workshops/nss-core';


export const questions = [
  {
      type: QUESTION_TYPES.RADIO,
      questionJsx:<p>Which of the following is NOT a core benefit of Infrastructure as Code (IaC)?</p>,
      answers: [
        "Consistency & Repeatability",
        "Version Control",
        "Manual Configuration",
        "Automation"
      ],
      correctAnswer: 2
  },
  {
      type: QUESTION_TYPES.CHECKBOX,
      questionJsx:<p>What are the typical steps in the Terraform workflow? (Select all that apply)</p>,
      answers: [
        "Write configuration files",
        "Compile code",
        "Generate an execution plan",
        "Apply changes to infrastructure",
        "Debug in browser"
      ],
      correctAnswers: [0,2,3]
  },
  {
      type: QUESTION_TYPES.RADIO,
      questionJsx:<p>What is a Terraform Provider?</p>,
      answers: [
        "A service that monitors your cloud infrastructure costs.",
        "A plugin that Terraform uses to interact with a cloud service or API.",
        "A proprietary language for writing infrastructure definitions.",
        "A tool for securely storing sensitive configuration data."
      ],
      correctAnswer: 1
  },
  {
      type: QUESTION_TYPES.RADIO,
      questionJsx:<p>Why is Terraform State important?</p>,
      answers: [
        "It stores your AWS login credentials securely.",
        "It tracks the actual resources deployed by Terraform and maps them to your configuration.",
        "It generates a visual diagram of your infrastructure.",
        "It provides a backup of your configuration files."
      ],
      correctAnswer: 1
  },
  {
      type: QUESTION_TYPES.RADIO,
      questionJsx:<p>Which Terraform command shows a detailed preview of changes without actually performing them?</p>,
      answers: [
        "`terraform init`",
        "`terraform apply`",
        "`terraform destroy`",
        "`terraform plan`"
      ],
      correctAnswer: 3
  }
];