//Grabbing packages
const inquirer = require('inquirer');
const fs = require('fs');

var title;
var content;


//Title, Description, Installation, Usage, License, Contributing, Tests, 
function askQuestions() {
    inquirer.prompt([{
                type: "input",
                name: "user",
                message: "What is your GitHub username?",
            },
            {
                type: "input",
                name: "email",
                message: "What is your email?",
            },
            {
                type: "input",
                name: "title",
                message: "What do you want to title the README as?",
            },
            {
                type: "input",
                name: "description",
                message: "Give a brief description of the project please!",
            },
            {
                type: "input",
                name: "install",
                message: "Explain how to install your project please!",
            },
            {
                type: "input",
                name: "usage",
                message: "Explain the basic functionality and usage of your project please!",
            },
            {
                type: "input",
                name: "contribution",
                message: "Explain what someone may need to do if they want to give feedback or contribute. If you are not accepting contributions, create a pull request, etc..",
            },
            {
                type: "input",
                name: "test",
                message: "If there are test files, explain what the they test for.",
            },
            {
                type: "list",
                name: "license",
                message: "What type of license would you like for this project?",
                choices: ['Unlicense', 'MIT', 'GNU General Public License v3.0']
            },
            {
                type: "input",
                name: "references",
                message: "Was this project influenced or helped greatly by another source?",
            },

        ])
        .then((data) => {

            switch (data.license) {
                case "Unlicense":
                    licenseIcon = "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-green)](http://unlicense.org/)";
                    break;
                case "MIT":
                    licenseIcon = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
                    break;
                case "GNU General Public License v3.0":
                    licenseIcon = "[![License: GBU Public License v3](https://img.shields.io/badge/license-GNU%20v3-green)](https://www.gnu.org/licenses/gpl-3.0.en.html)"
                    break;
            }

            githubprofile = "https://github.com/" + data.user;

            title = data.title;

            content = `
# ${data.title}
${licenseIcon}
## Table of Contents   
- [${data.title}](#datatitle)
- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Testing](#testing)
- [Questions](#questions)
- [Github](#github)
- [License](#license)
## Description  
${data.description}  
## Installation
${data.install}
## Usage
${data.usage}
## Contribution
${data.contribution}
## Testing
${data.test}
## Questions
If there are questions, use this email to reach out ${data.email}
## Github
Link to my GitHub profile: ${githubprofile}
## License
This project is covered by the ${data.license} license.
## References
${data.references}
`;

            writeFile(title, content);
        });
}

function writeFile(title, content) {

    var mdtitle = `${title.toLowerCase().split(' ').join('')}.md`;

    fs.writeFile(mdtitle, content, (err) =>
        err ? console.log(err) : console.log('README file was exported!')
    );
}

askQuestions()