// global variables and require variables
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const {
    argv
} = require("process");
const {
    prompt
} = require("inquirer");
const employees = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function managerPrompt() {
    console.log("Let's build your team!")
    return prompt([{
            type: "input",
            message: "What is your manager's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your manager's id number?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your manager's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your manager's office number?",
            name: "officeNumber"
        }

    ])
}
//Function to select the next employee you want to add, or to exit the prompt
function chooseNextEmployee() {
    return prompt({
        type: "list",
        message: "Which role would you like to add to your team?",
        choices: ["Engineer", "Intern", "I'm done adding team members."],
        name: "role"
    })
}
//Function to collect information about engineers
function engineerPrompt() {
    return prompt([{
            type: "input",
            message: "What is your engineer's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your engineer's id number?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your engineer's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your engineer's GitHub",
            name: "github"
        }
    ])
}
//Function to collect information about interns
function internPrompt() {
    return prompt([{
            type: "input",
            message: "What is your intern's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your intern's id number?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your intern's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What school is your intern attending?",
            name: "school"
        }
    ])
}
//async function to initialize the prompts 
async function init() {
    //clears out our output directory after running code
    fs.rmdirSync(OUTPUT_DIR, {
        recursive: true
    })
    const {
        name,
        id,
        email,
        officeNumber
    } = await managerPrompt()
    // making a new variable, using the Manager class
    const manager = new Manager(name, id, email, officeNumber)
    // pushing our manager variable to the employees array
    employees.push(manager)
    // calling function to prompt the user to choose next employee role
    newPrompt()
}
//Calling async function to choose next employee
async function newPrompt() {
    const nextEmployee = await chooseNextEmployee()
    //If statement to call function based on the response given by the user
    if (nextEmployee.role === "Engineer") {
        const {
            name,
            id,
            email,
            github
        } = await engineerPrompt();
        // making a new variable, using the Engineer class
        const engineer = new Engineer(name, id, email, github);
        //pushing our manager variable to the employees array
        employees.push(engineer);
        // calling function to prompt the user to choose next employee role
        newPrompt();
    } else if (nextEmployee.role === "Intern") {
        const {
            name,
            id,
            email,
            school
        } = await internPrompt();
        // making a new variable, using the Intern class
        const intern = new Intern(name, id, email, school);
        //pushing our manager variable to the employees array
        employees.push(intern);
        // calling function to prompt the user to choose next employee role
        newPrompt()
    }
    // After the user has input all employees desired, call the `render` function (required
    // above) and pass in an array containing all employee objects; the `render` function will
    // generate and return a block of HTML including templated divs for each employee!
    // When the user chooses "I'm done adding team members", the code within the else statement is run
    else {
        // calling the render function from htmlRenderer.js
        const renderHTML = render(employees);
        // Making a directory "output"
        fs.mkdir(__dirname + '/output', function (err) {
            if (err) console.log(err);
        })
        //Writing a file, using the template retrieved from htmlrenderer.js, with the data collected in the employees array
        fs.writeFile(outputPath, renderHTML, function (err) {
            if (err) console.log(err);
        });
        console.log("Success!");
    }
}

// calling function to begin the inquirer prompt sequence
init();