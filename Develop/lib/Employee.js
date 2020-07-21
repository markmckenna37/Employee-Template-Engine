// TODO: Write code to define and export the Employee class
// Employee class to use as a template for the other employee positions

class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email
    }
    getName() {
        console.log(`Employee name: ${this.name}`);
    }
    getID() {
        console.log(`Employee id: ${this.id}`);
    }
    getEmail() {
        console.log(`Employee email: ${this.email}`); 
    }
}

module.exports = Employee;