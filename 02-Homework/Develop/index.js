// External packages
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// Internal modules
const generateMarkdown = require('./utils/generateMarkdown.js');

// array of questions for user
const questions = [

    {
        type: 'input',
        message: "What is your GitHub username? ",
        name: 'username',
        },
    {
        type: 'input',
        message: "What is the name of your GitHub repo?",
        name: 'repo',
        default: 'readme-generator',
        },
    {
        type: 'input',
        message: "What is the title of your project?",
        name: 'title',
        default: 'Project Title',
       },
    {
        type: 'input',
        message: "Write a description of your project.",
        name: 'description',
        default: 'Project Description',
        },
    {
        type: 'input',
        message: "Describe the steps required to install your project for the Installation section.",
        name: 'installation'
    },
    {
        type: 'input',
        message: "Provide usage instructions and examples of your project if any.",
        name: 'usage'
    },
    {
        type: 'input',
        message: "How can other developers contribute to your project?",
        name: 'contributing'
    },
    {
        type: 'input',
        message: "Do you have any tests written for your application and can you provide examples on how to run them? Please describe.",
        name: 'tests'
    },
    {
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    }
];

// function to write README file
function writeToFile(fileName, data) {

    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Success!")
    });
}

const writeFileAsync = util.promisify(writeToFile);


// function to initialize program
async function init() {
    try {

        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Thank you for your responses");
    
        const userInfo = await api.getUser(userResponses);
        console.log("GitHub user info: ", userInfo);
    
        console.log("Generating your README")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);
    
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};


