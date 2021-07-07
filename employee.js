class Employee {
    constructor(myName, employeeType, id, email, misc) {
        this.name = myName;
        this.id = id;
        this.email = email;
        this.misc = misc;
        this.employeeType = employeeType
    }
}

module.exports = Employee;