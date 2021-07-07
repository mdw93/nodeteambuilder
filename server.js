const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const { getMaxListeners } = require('process');

let myArray = []
let myNameID = null

const Intern = require('./intern')
const Manager = require('./manager')
const Engineer = require('./engineer')

//if statement to loop through prompt or and the loop
const myMembers = (answers) => {
    if (answers.teamType === 'engineer') {
        myEngineer()
            .then((answers) => createEngineer(answers))
    } else if (answers.teamType === 'intern') {
        myIntern()
            .then((answers) => createIntern(answers))
    } else {
        createHTML('index.html', generateHTML())
            .then(createCards()).then(generateHTMLBottom)
    }
}

//function that creates a class based on prompt answers (this is pushed to an empty area then run through a if statement (myMembers) to decide next route)
const createManager = (answers) => {
    myNameID = answers.managerName + answers.managerID
    myNameID = new Manager(answers.managerName, 'Manager', answers.managerID, answers.managerEmail, answers.managerOffice)
    myArray.push(myNameID)
    myMembers(answers)
}

const createEngineer = (answers) => {
    myNameID = answers.engineerName + answers.engineerID
    myNameID = new Engineer(answers.engineerName, 'Engineer', answers.engineerID, answers.engineerEmail, answers.engineerGithub)
    myArray.push(myNameID)
    myMembers(answers)
}

const createIntern = (answers) => {
    myNameID = answers.internName + answers.internID
    myNameID = new Intern(answers.internName, 'Intern', answers.internID, answers.internEmail, answers.internSchool)
    myArray.push(myNameID)
    myMembers(answers)
}

//top portion of the html page
const generateHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
  <title>Document</title>
</head>
<body>
<h1>My Team!</h1>

    <div class="container">
    <div class="row" id='holding'>

`;
}

//bottom portion of the html page couldnt get this to work with a .then so added to the if statement (not sure what I was doing wrong)
const generateHTMLBottom = () => {
    fs.appendFile('index.html',
        ` </div>
</div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
            crossorigin="anonymous"></script>
</html>`
        , function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
}

//initial prompt for manager info
const teamInfo = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: 'What is the manager\'s name?',
        },
        {
            type: 'input',
            name: 'managerID',
            message: 'What is the employee ID?',
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: 'What is their email address?',
        },
        {
            type: 'input',
            name: 'managerOffice',
            message: 'What is their office number?',
        },
        {
            type: 'list',
            name: 'teamType',
            message: 'Please pick the team member type or complete your team.',
            choices: ['engineer', 'intern', 'teamCompleted']
        }
    ]);
};

//prompt for engineer info
const myEngineer = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'engineerName',
            message: 'What is the engineer\'s name?',
        },
        {
            type: 'input',
            name: 'engineerID',
            message: 'What is the employee ID?',
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: 'What is their email address?',
        },
        {
            type: 'input',
            name: 'engineerGithub',
            message: 'What is their github?',
        },
        {
            type: 'list',
            name: 'teamType',
            message: 'Please pick the team member type or complete your team.',
            choices: ['engineer', 'intern', 'teamCompleted']
        }
    ]);
};

//prompt for intern info
const myIntern = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'internName',
            message: 'What is the intern\'s name?',
        },
        {
            type: 'input',
            name: 'internID',
            message: 'What is the employee ID?',
        },
        {
            type: 'input',
            name: 'internEmail',
            message: 'What is their email address?',
        },
        {
            type: 'input',
            name: 'internSchool',
            message: 'What school do they go to?',
        },
        {
            type: 'list',
            name: 'teamType',
            message: 'Please pick the team member type or complete your team.',
            choices: ['engineer', 'intern', 'teamCompleted']
        }
    ]);
};

//function to create html page
const createHTML = util.promisify(fs.writeFile)

const init = () => {

    teamInfo()
        .then((answers) => createManager(answers))
};

//Function to create cards and append the bottom portion of the html
const createCards = () => {
    for (let i = 0; i < myArray.length; i++) {
    if
        (myArray[i].employeeType === 'Manager') {
            let myname = myArray[i].name
            let myid = myArray[i].id
            let myemail = myArray[i].email
            let mymisc = myArray[i].misc
            let myemployeeType = myArray[i].employeeType

            const myManagerText = `<div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${myname}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${myemployeeType}</h6>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${myid}</li>
            <li class="list-group-item">email
            <a href="mailto:${myemail}">${myemail}</a>
            </li>
            <li class="list-group-item">Office: ${mymisc}</li>
            </ul>
            </div>
            </div>`

            fs.appendFile('index.html', myManagerText,
                function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                })

        } else if (myArray[i].employeeType === 'Engineer') {
            let myname = myArray[i].name
            let myid = myArray[i].id
            let myemail = myArray[i].email
            let mymisc = myArray[i].misc
            let myemployeeType = myArray[i].employeeType

            const myEngineerText = `<div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${myname}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${myemployeeType}</h6>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${myid}</li>
            <li class="list-group-item">email
                <a href="mailto:${myemail}">${myemail}</a>
            </li>
            <li class="list-group-item">Github
                <a href="https://github.com/${mymisc}" target="_blank">${mymisc}</a>
            </li>
            </ul>
            </div>
            </div>`


            fs.appendFile('index.html', myEngineerText,
                function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                })

        } else {
            let myname = myArray[i].name
            let myid = myArray[i].id
            let myemail = myArray[i].email
            let mymisc = myArray[i].misc
            let myemployeeType = myArray[i].employeeType

            const myInternText = `<div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${myname}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${myemployeeType}</h6>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${myid}</li>
            <li class="list-group-item">email
            <a href="mailto:${myemail}">${myemail}</a>
            </li>
            <li class="list-group-item">School: ${mymisc}</li>
            </ul>
            </div>
            </div>`

            fs.appendFile('index.html', myInternText,
                function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                })
        }
    }
}

init()
