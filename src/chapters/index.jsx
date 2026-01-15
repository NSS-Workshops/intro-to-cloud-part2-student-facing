
import { Checkpoint } from '@nss-workshops/nss-core';


import {nav} from "./nav.js";

// Introduction chapters
import LlmToolingSetup from "./Introduction/llm-tooling-setup.md?raw";


// Terraform Chapters
import TerraformPageOne from "./Terraform/terraform-fundamentals.md?raw";
import TerraformPageTwo from "./Terraform/terraform-setup.md?raw";
import TerraformPageThree from "./Terraform/terraform-expanded.md?raw"
import TerraformPageFour from "./Terraform/client-side-setup.md?raw"
import {questions as questions} from "./Terraform/questions_1.jsx";

// IAM Chapters 
import IamPageOne from "./IAM/page_one.md?raw";
import IamPageTwo from "./IAM/page_two.md?raw";
import IamPageThree from "./IAM/page_three.md?raw";
import { Iamquestions as Iamquestions } from './IAM/questions_1.jsx';

// Networking Chapters
import NetworkingPageOne from "./Networking/networking-intro.md?raw";
import NetworkingPageTwo from "./Networking/diagramming.md?raw";
import NetworkingPageThree from "./Networking/network-setup.md?raw";
import {questions as networkQuestions} from "./Networking/networking-questions.jsx";

// EC2 RDS Terraform Chapters
import EC2RDSPageOne from "./RDS_EC2/ec2.md?raw";
import EC2RDSPageTwo from "./RDS_EC2/rds.md?raw";
import EC2RDSPageThree from "./RDS_EC2/deploy.md?raw";

// Load Balancing Chapters
import LoadBalancingPageOne from "./Load_Balancing/load-balancing-intro.md?raw"
import LoadBalancingPageTwo from "./Load_Balancing/load-balancing-setup.md?raw"
import LoadBalancingPageThree from "./Load_Balancing/api-updates.md?raw"

// Module Seven Imports
import moduleSixPageOne from "./module_6/page_one.md?raw"


const moduleOneId = nav[0].id;
const moduleTwoId = nav[1].id;
const moduleThreeId = nav[2].id;
const moduleFourId = nav[3].id;
const moduleFiveId = nav[4].id;
const moduleSixId = nav[5].id;
const moduleSevenId = nav[6].id;


export const chapters = [
  {
    id: moduleOneId + "-page-1",
    title: 'Introduction and Course Outline',
    sectionId: moduleOneId,
    previousChapterId: null,
    content: LlmToolingSetup
  },
  {
    id: moduleTwoId + "-page-1",
    title: 'Terraform Fundamentals',
    sectionId: moduleTwoId,
    previousChapterId: null,
    content: TerraformPageOne,
    quiz: {component: () => <>
       <h1>Checkpoint</h1>
       <Checkpoint questions={questions}/>
     </>
    }
  },
  {
    id: moduleTwoId + "-page-2",
    title: 'My First Terraform Project',
    sectionId: moduleTwoId,
    previousChapterId:  moduleTwoId + "-page-1",
    content: TerraformPageTwo
  },
    {
    id: moduleTwoId + "-page-3",
    title: 'Terraform Expanded',
    sectionId: moduleTwoId,
    previousChapterId: moduleTwoId + "-page-2",
    content: TerraformPageThree
  },
  {
    id: moduleTwoId + "-page-4",
    title: 'Rock of Ages Client Side Infrastructure Setup',
    sectionId: moduleTwoId,
    previousChapterId:  moduleTwoId + "-page-3",
    content: TerraformPageFour
  },
  {
    id: moduleThreeId + "-page-1",
    title: 'IAM Basics and Permissions',
    sectionId: moduleThreeId,
    previousChapterId: null,
    content: IamPageOne,
    quiz: {
      component: () => <>
        <h1>Checkpoint</h1>
        <Checkpoint questions={Iamquestions} />
      </>
    }
  },
  {
    id: moduleThreeId + "-page-2",
    title: 'IAM Best Practices',
    sectionId: moduleThreeId,
    previousChapterId: moduleThreeId + "-page-1",
    content: IamPageTwo,
    exercise: null,
  },
  {
    id: moduleThreeId + "-page-3",
    title: 'IAM in Terraform',
    sectionId: moduleThreeId,
    previousChapterId: moduleThreeId + "-page-2",
    content: IamPageThree,
    exercise: null,
  },
  {
    id: moduleFourId + "-page-1",
    title: 'Networking Basics and Security Groups',
    sectionId: moduleFourId,
    previousChapterId: null,
    content: NetworkingPageOne,
    exercise: null,
    quiz: {component: () => <>
       <h1>Checkpoint</h1>
       <Checkpoint questions={networkQuestions}/>
     </>
    }
  },
  {
    id: moduleFourId + "-page-2",
    title: 'Understanding Networking Diagrams',
    sectionId: moduleFourId,
    previousChapterId: moduleFourId + "-page-1",
    content: NetworkingPageTwo,
    exercise: null,
  },
  {
    id: moduleFourId + "-page-3",
    title: 'Networking in Terraform',
    sectionId: moduleFourId,
    previousChapterId: moduleFourId + "-page-2",
    content: NetworkingPageThree,
    exercise: null,
  },
  {
    id: moduleFiveId + "-page-1",
    title: 'EC2 in Terraform',
    sectionId: moduleFiveId,
    previousChapterId: null,
    content: EC2RDSPageOne,
    exercise: null,
  },
  {
    id: moduleFiveId + "-page-2",
    title: 'RDS in Terraform',
    sectionId: moduleFiveId,
    previousChapterId: moduleFiveId + "-page-1",
    content: EC2RDSPageTwo,
    exercise: null,
  },
  {
    id: moduleFiveId + "-page-3",
    title: 'Deploy the Rock-of-Ages Application',
    sectionId: moduleFiveId,
    previousChapterId: moduleFiveId + "-page-2",
    content: EC2RDSPageThree,
    exercise: null,
  },
  {
    id: moduleSixId + "-page-1",
    title: 'Load Balancing Fundamentals',
    sectionId: moduleSixId,
    previousChapterId: null,
    content: LoadBalancingPageOne,
    exercise: null,
  },
  {
    id: moduleSixId + "-page-2",
    title: 'Load Balancing Fundamentals',
    sectionId: moduleSixId,
    previousChapterId: moduleSixId + "-page-1",
    content: LoadBalancingPageTwo,
    exercise: null,
  },
  {
    id: moduleSixId + "-page-3",
    title: 'Load Balancing Fundamentals',
    sectionId: moduleSixId,
    previousChapterId: moduleSixId + "-page-2",
    content: LoadBalancingPageThree,
    exercise: null,
  },
  {
    id: moduleSevenId + "-page-1",
    title: 'Event-Driven Architecture Concepts and Lambda Fundamentals',
    sectionId: moduleSevenId,
    previousChapterId: null,
    content: moduleSixPageOne,
    exercise: null,
  },
]