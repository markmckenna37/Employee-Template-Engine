// TODO: Write code to define and export the Employee class
// Employee class to use as a template for the other employee positions

class Employee {
    // collecting constructor values from employee class
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email
    }
    // functions to get employee name, id, email, and role
    getName() {
        return this.name
    }
    getId() {
        return this.id
    }
    getEmail() {
        return this.email
    }
    getRole() {
        return "Employee"
    }
}
// Exporting our employee class
module.exports = Employee;