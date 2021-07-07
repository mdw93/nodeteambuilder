class Engineer {
    constructor(myName, employeeType, id, email, misc) {
        this.name = myName;
        this.id = id;
        this.email = email;
        this.misc = misc;
        this.employeeType = 'Engineer'
    }
}

module.exports = Engineer;