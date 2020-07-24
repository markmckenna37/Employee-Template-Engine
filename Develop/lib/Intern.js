// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
// extending from the employee template
class Intern extends Employee {
    // collecting constructor values from employee class
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school
    }
    // function to get school of intern
    getSchool() {
        return this.school;
    }
    //function to get role
    getRole() {
        return "Intern"
    }
}

// Exporting our intern class
module.exports = Intern