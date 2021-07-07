class Intern {
    constructor(myName, employeeType, id, email, misc) {
        this.name = myName;
        this.id = id;
        this.email = email;
        this.misc = misc;
        this.employeeType = 'Intern'
    }
}

module.exports = Intern;