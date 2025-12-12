
import { Checkpoint } from '@nss-workshops/nss-core';


import {nav} from "./nav.js";
// Terraform Chapters
import TerraformPageOne from "./Terraform/terraform-fundamentals.md?raw";
import TerraformPageTwo from "./Terraform/terraform-setup.md?raw";
import TerraformPageThree from "./Terraform/terraform-expanded.md?raw"
import TerraformPageFour from "./Terraform/client-side-setup.md?raw"
import {questions as questions} from "./Terraform/questions_1.jsx";

// Module Two Imports
import moduleTwoPageOne from "./module_2/page_one.md?raw";
import moduleTwoPageTwo from "./module_2/page_two.md?raw";
import excerciseTwo from "./module_2/excersize_2.js?raw";
import solutionTwo from "./module_2/solution_2.js?raw";
import {tests as t2} from "./module_2/tests_2.js";

// Module Three Imports
import moduleThreePageOne from "./module_3/page_one.md?raw";

// Module Four Imports
import moduleFourPageOne from "./module_4/page_one.md?raw";

// Module Five Imports 
import moduleFivePageOne from "./module_5/page_one.md?raw";

// Module Six Imports
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
    title: 'Variables, Outputs, AWS Auth, and Terraform State',
    sectionId: moduleTwoId,
    previousChapterId: null,
    content: moduleTwoPageOne,
    exercise: null
  },
  {
    id: moduleTwoId + "-page-2",
    title: 'Variables, Outputs, AWS Auth, and Terraform State Continued',
    sectionId: moduleTwoId,
    previousChapterId: moduleTwoId + "-page-1",
    content: moduleTwoPageTwo,
    exercise: {
      starterCode: excerciseTwo,
      solution: solutionTwo,
      tests: t2
    },
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
    content: moduleFourPageOne,
    exercise: null,
  },
  {
    id: moduleFiveId + "-page-1",
    title: 'IAM Basics and Permissions',
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