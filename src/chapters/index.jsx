
import { Checkpoint } from '@nss-workshops/nss-core';
import {nav} from "./nav.js";


// Introduction Imports
import IntroductionPageOne from "./Introduction/intro-to-course.md?raw";
import IntroductionPageTwo from "./Introduction/pre-requisites.md?raw";

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

// Module four Imports
import moduleFourPageOne from "./module_4/page_one.md?raw";

// Module five Imports
import moduleFivePageOne from "./module_5/page_one.md?raw";


// Module six Imports
import moduleSixPageOne from "./module_6/page_one.md?raw";

// Module Seven Imports
import moduleSevenPageOne from "./module_7/page_one.md?raw"


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
    title: 'Inroduction',
    sectionId: moduleOneId,
    previousChapterId: null,
    content: IntroductionPageOne
  },
  {
    id: moduleOneId + "-page-1",
    title: 'Inroduction',
    sectionId: moduleOneId,
    previousChapterId: moduleOneId + "-page-1",
    content: IntroductionPageTwo
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
    title: 'Understanding the Terraform Architecture (EC2, S3, CloudFront, RDS',
    sectionId: moduleFourId,
    previousChapterId: null,
    content: moduleFourPageOne,
    exercise: null,
  },
  {
    id: moduleFiveId + "-page-1",
    title: 'Networking Basics and Security Groups',
    sectionId: moduleFiveId,
    previousChapterId: null,
    content: moduleFivePageOne,
    exercise: null,
  },
  {
    id: moduleSixId + "-page-1",
    title: 'Load Balancing Fundamentals',
    sectionId: moduleSixId,
    previousChapterId: null,
    content: moduleSixPageOne,
    exercise: null,
  },
  {
    id: moduleSevenId + "-page-1",
    title: 'Event-Driven Architecture Concepts and Lambda Fundamentals',
    sectionId: moduleSevenId,
    previousChapterId: null,
    content: moduleSevenPageOne,
    exercise: null,
  },
]