const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { argv } = require("process");
const { prompt } = require("inquirer");
const employees = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function managerPrompt() {
    console.log("Let's build your team!")
    return prompt([
    {
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

function chooseNextEmployee() {
    return inquirer.prompt(
        {
            type: "list",
            message: "Which role would you like to add to your team?",
            choices: ["Engineer", "Intern", "I'm done adding team members."],
            name: "role"
    })
}

function engineerPrompt() {
    return inquirer.prompt([
        {
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
function internPrompt() {
    return inquirer.prompt([
        {
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
async function init() {
    fs.rmdirSync(OUTPUT_DIR, { recursive: true });
    const {name, id, email, officeNumber} = await managerPrompt()
    const manager = new Manager(name, id, email, officeNumber)
    employees.push(manager)
    newPrompt()
}
async function newPrompt() {
    const nextEmployee = await chooseNextEmployee()
    if (nextEmployee.role === "Engineer") {
       const {name, id, email, github} = await engineerPrompt();
       const engineer = new Engineer(name, id, email, github);
       employees.push(engineer);
       newPrompt();
    }
    else if (nextEmployee.role === "Intern") {
        const {name, id, email, school} = await internPrompt();
        const intern = new Intern(name, id, email, school);
        employees.push(intern);
        newPrompt()
    }
    else {
        console.log(employees)
        const renderHTML = render(employees);
        fs.mkdir(__dirname + '/output', function (err) {
            if (err) console.log(err);
        })
        fs.writeFile(outputPath, renderHTML, function (err) {
            if (err) console.log(err);
        });
        console.log("Success!");
    }
}


init();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
