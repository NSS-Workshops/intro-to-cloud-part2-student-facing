
import { Checkpoint } from '@nss-workshops/nss-core';


import {nav} from "./nav.js";
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

// Module Three Imports
import moduleThreePageOne from "./module_3/page_one.md?raw";

// Networking Chapters
import NetworkingPageOne from "./Networking/networking-intro.md?raw";
import NetworkingPageTwo from "./Networking/diagramming.md?raw";
import NetworkingPageThree from "./Networking/network-setup.md?raw";
import {questions as networkQuestions} from "./Networking/networking-questions.jsx";



// Module five Imports
import moduleFivePageOne from "./module_5/page_one.md?raw";

// Module Seven Imports
import moduleSixPageOne from "./module_6/page_one.md?raw"



const moduleOneId = nav[0].id;
const moduleTwoId = nav[1].id;
const moduleThreeId = nav[2].id;
const moduleFourId = nav[3].id;
const moduleFiveId = nav[4].id;
const moduleSixId = nav[5].id;


export const chapters = [
  {
    id: moduleOneId + "-page-1",
    title: 'Terraform Fundamentals',
    sectionId: moduleOneId,
    previousChapterId: null,
    content: TerraformPageOne,
    quiz: {component: () => <>
       <h1>Checkpoint</h1>
       <Checkpoint questions={questions}/>
     </>
    }
  },
  {
    id: moduleOneId + "-page-2",
    title: 'My First Terraform Project',
    sectionId: moduleOneId,
    previousChapterId:  moduleOneId + "-page-1",
    content: TerraformPageTwo
  },
    {
    id: moduleOneId + "-page-3",
    title: 'Terraform Expanded',
    sectionId: moduleOneId,
    previousChapterId: moduleOneId + "-page-2",
    content: TerraformPageThree
  },
  {
    id: moduleOneId + "-page-4",
    title: 'Rock of Ages Client Side Infrastructure Setup',
    sectionId: moduleOneId,
    previousChapterId:  moduleOneId + "-page-3",
    content: TerraformPageFour
  },
  {
    id: moduleTwoId + "-page-1",
    title: 'IAM Basics and Permissions',
    sectionId: moduleTwoId,
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
    id: moduleTwoId + "-page-2",
    title: 'IAM Best Practices',
    sectionId: moduleTwoId,
    previousChapterId: moduleTwoId + "-page-1",
    content: IamPageTwo,
    exercise: null,
  },
  {
    id: moduleTwoId + "-page-3",
    title: 'IAM in Terraform',
    sectionId: moduleTwoId,
    previousChapterId: moduleTwoId + "-page-2",
    content: IamPageThree,
    exercise: null,
  },
  {
    id: moduleThreeId + "-page-1",
    title: 'Understanding the Terraform Architecture (EC2, S3, CloudFront, RDS',
    sectionId: moduleThreeId,
    previousChapterId: null,
    content: moduleThreePageOne,
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
    title: 'Load Balancing Fundamentals',
    sectionId: moduleFiveId,
    previousChapterId: null,
    content: moduleFivePageOne,
    exercise: null,
  },
  {
    id: moduleSixId + "-page-1",
    title: 'Event-Driven Architecture Concepts and Lambda Fundamentals',
    sectionId: moduleSixId,
    previousChapterId: null,
    content: moduleSixPageOne,
    exercise: null,
  },
]