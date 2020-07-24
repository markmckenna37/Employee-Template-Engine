// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");
// extending from the employee template
class Manager extends Employee {
    // collecting constructor values from employee class
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    // function to get office number of manager
    getOfficeNumber() {
        return this.officeNumber
    }
    // function to get role 
    getRole() {
        return "Manager"
    }
}

// Exporting our manager class
module.exports = Manager;