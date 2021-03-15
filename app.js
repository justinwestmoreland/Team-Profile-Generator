const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

function createManager() {
    console.log("Please enter your team's information.")
    inquirer.prompt([{
            type: "input",
            message: "What is your manager's name?",
            name: "name"

        },
        {
            type: "number",
            message: "What is your manager's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your manager's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your manager's office number?",
            name: "officeNumber"
        }

    ]).then((response) => {
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        teamMembers.push(manager);
        createTeam();
    })
}

function createEngineer() {
    inquirer.prompt([{
            type: "input",
            message: "What is your engineer's name?",
            name: "name"

        },
        {
            type: "number",
            message: "What is your engineer's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your engineer's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your engineer's GitHub username?",
            name: "github"
        }

    ]).then((response) => {
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        teamMembers.push(engineer);
        createTeam();
    })
}

function createIntern() {
    inquirer.prompt([{
            type: "input",
            message: "What is your intern's name?",
            name: "name"

        },
        {
            type: "number",
            message: "What is your intern's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your intern's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your intern's school?",
            name: "school"
        }

    ]).then((response) => {
        const intern = new Intern(response.name, response.id, response.email, response.school);
        teamMembers.push(intern);
        createTeam();
    })
}

function createTeam() {
    inquirer.prompt([{
        type: "list",
        message: "Which type of team member would you like to add?",
        name: "role",
        choices: ["Engineer", "Intern", "I don't want to add any more team members"]
    }]).then((response) => {
        switch (response.role) {
            case "Engineer":
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            default:
                checkOutPut();
        }
    })
}

function checkOutPut() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}


createManager();