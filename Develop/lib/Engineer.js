// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
// extending from the employee template
class Engineer extends Employee {
    constructor(name, id, email, github) {
        // collecting constructor values from employee class
        super(name, id, email);
        this.github = github;
    }
    // function to get office github of engineer
    getGithub() {
        return this.github
    }
    //function to get role
    getRole() {
        return "Engineer"
    }
}
// Exporting our engineer class
module.exports = Engineer