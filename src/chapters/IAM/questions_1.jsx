import { QUESTION_TYPES } from '@nss-workshops/nss-core';


export const Iamquestions = [
    {
        type: QUESTION_TYPES.RADIO,
        questionJsx: <p>What is an IAM user?</p> ,
        answers: [
            "A temporary identity that expires after a few hours",
            "A collection of permissions",
            "A long-term identity representing a person or application",
            "An AWS service that needs access to resources"
        ],
        correctAnswer: 2
},
    {
        type: QUESTION_TYPES.RADIO,
        questionJsx: <p><br /> Why should you use IAM roles instead of access keys for applications running on EC2 instances?</p>,
        answers: [
            "Roles are faster than access keys",
            "Roles provide temporary credentials that rotate automatically",
            "Roles allow access to more AWS services than access keys",
            "Access keys are being deprecated by AWS"
        ],
        correctAnswer: 1
    },
    {
        type: QUESTION_TYPES.RADIO,
        questionJsx: <p><br />Which statement about IAM groups is TRUE?</p>,
        answers: [
            "Groups can contain other groups (nested groups)",
            "Groups have their own credentials for accessing AWS",
            "A user can only belong to one group at a time",
            "Groups are collections of users that share the same permissions"
        ],
        correctAnswer: 3
    },
    {
        type: QUESTION_TYPES.RADIO,
        questionJsx: <p><br />If a user belongs to three groups, each with different policies attached, what permissions does the user have?</p>,
        answers: [
            "Only the permissions from the first group they joined",
            "Only the permissions from their primary group",
            "The union of all permissions from all three groups",
            "They must choose which group's permissions to use"
        ],
        correctAnswer: 2
    },
    {
        type: QUESTION_TYPES.RADIO,
        questionJsx: (
            <p>
                <br />
                In the resource ARN <code>arn:aws:s3:::my-bucket/*</code>, what does the <code>/* </code>represent?
            </p>
        ),
        answers: [
            "All buckets in the account",
            <>All objects inside the bucket <code>my-bucket</code></>,
            "The bucket itself",
            "All S3 resources in all regions"
        ],
        correctAnswer: 1
    },
];