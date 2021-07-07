const Intern = require('./intern')
const Manager = require('./manager')
const Engineer = require('./engineer');
const Employee = require('./employee');


//tests to run the four required classes
describe("Engineer", () => {
  it("should take in parameters and return a new class", () => {
    const str = {
        name: 'matt',
        employeeType: 'Engineer',
        id: '8',
        email: 'mdw@gmail.com',
        misc: 'mdw'
    };

    const result = new Engineer('matt', 'Engineer', '8', 'mdw@gmail.com', 'mdw');

    expect(result).toEqual(str);
  });
});

describe("Intern", () => {
  it("should take a string and return a new string with the first letter of each word capitalized", () => {
    const str = {
        name: 'matt',
        employeeType: 'Intern',
        id: '8',
        email: 'mdw@gmail.com',
        misc: 'UGA'
    };

    const result = new Intern('matt', 'Intern', '8', 'mdw@gmail.com', 'UGA')

    expect(result).toEqual(str);
  });
});

describe("Manager", () => {
  it("should take in parameters and return a new class", () => {
    const str = {
        name: 'matt',
        employeeType: 'Engineer',
        id: '8',
        email: 'mdw@gmail.com',
        misc: 'North'
    };

    const result = new Engineer('matt', 'Manager', '8', 'mdw@gmail.com', 'North');

    expect(result).toEqual(str);
  });
});

describe("Employee", () => {
  it("should take in parameters and return a new class", () => {
    const str = {
        name: 'matt',
        employeeType: 'CEO',
        id: '8',
        email: 'mdw@gmail.com',
        misc: 'South'
    };

    const result = new Employee ('matt', 'CEO', '8', 'mdw@gmail.com', 'South');

    expect(result).toEqual(str);
  });
});
;

