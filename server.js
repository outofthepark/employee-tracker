const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');
const Department = require('./lib/Department');
const cTable = require('console.table');
const { connectableObservableDescriptor } = require('rxjs/internal/observable/ConnectableObservable');

async function getNewEmployeeFields() {
    const roleArr = await Role.getAllInArray('title');
    const employeeArr = await Employee.getAllInArray('fullName');
    return inquirer
        .prompt([
        {
            type: 'text',
            name: 'firstName',
            message: 'What is the employee\'s first name?',
            validate: firstName => {
                if (firstName) {
                  return true;
                } else {
                  console.log('Please enter a name!');
                  return false;
                }
            }
        },
        {
            type: 'text',
            name: 'lastName',
            message: 'What is the employee\'s last name?',
            validate: lastName => {
                if (lastName) {
                  return true;
                } else {
                  console.log('Please enter a last name!');
                  return false;
                }
            }
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is their role?',
            choices: roleArr
         },
         {
            type: 'list',
            name: 'manager',
            message: 'Who is their manager?',
            choices: employeeArr
         }
        ]);
}

async function getNewRoleFields() {
    const departmentArr = await Department.getAllInArray('name');
    return inquirer
        .prompt([
        {
            type: 'text',
            name: 'name',
            message: 'What is the role\'s name',
            validate: firstName => {
                if (firstName) {
                  return true;
                } else {
                  console.log('Please enter a name!');
                  return false;
                }
            }
        },
        {
            type: 'text',
            name: 'salary',
            message: 'What is the role\'s salary?',
            validate: salary => {
                if (salary) {
                  return true;
                } else {
                  console.log('Please enter a salary for the role!');
                  return false;
                }
            }
        },
        {
            type: 'list',
            name: 'department',
            message: 'What department is the role under?',
            choices: departmentArr
         }
        ]);
}

async function getNewDepartmentFields() {
    return inquirer
        .prompt([
        {
            type: 'text',
            name: 'name',
            message: 'What is the new departments name?',
            validate: firstName => {
                if (firstName) {
                  return true;
                } else {
                  console.log('Please enter a name!');
                  return false;
                }
            }
        }]);
}

async function chooseAction() {
    const roleArr = await Role.getAllInArray('title');
    const employeeArr = await Employee.getAllInArray('fullName');
    const departmentArr = await Employee.getAllInArray('name');
    return inquirer
        .prompt([
        {
            type: 'list',
            name: 'chooseAction',
            message: 'What would you like to do with the employees table?',
            choices: ['View all Employees', 'View employees by role', 'View employeees by manager', 'Add a new employee', 'Update an existing employee\'s information', 'Delete an existing employee', 'View all roles','Add a new role', 'Update an existing role', 'View all departments', 'Add a new department', 'Update an existing department name'],
        },
        {
            type: 'list',
            name: 'viewByRole',
            message: 'What role would you like to see employees for?',
            choices: roleArr,
            when: (answers) => { return (answers.chooseAction === 'View employees by role'); }
         },
         {
            type: 'list',
            name: 'viewByManager',
            message: 'Which manager\'s emlployees would you like to view?',
            choices: employeeArr,
            when: (answers) => { return (answers.chooseAction === 'View employeees by manager'); }
         },
        {
            type: 'list',
            name: 'deleteEmployee',
            message: 'Which employee\'s would you like to delete?',
            choices: employeeArr,
            when: (answers) => { return (answers.chooseAction === 'Delete an existing employee'); }
         },
         {
            type: 'confirm',
            name: 'confirmDeleteEmployee',
            message: 'Are you sure you want to delete this employee from the Employee table?',
            default: false,
            when: (answers) => { return (answers.chooseAction === 'Delete an existing employee'); }
        },
        {
            type: 'list',
            name: 'updateEmployee',
            message: 'Which employee\'s information needs be updated?',
            choices: employeeArr,
            when: (answers) => { return (answers.chooseAction === 'Update an existing employee\'s information'); }
         },
        {
            type: 'list',
            name: 'updateEmployeeField',
            message: 'What information would you like to update?',
            choices: ['Role', 'Manager', 'First Name', 'Last Name'],
            when: (answers) => { return (answers.chooseAction === 'Update an existing employee\'s information'); }
         },
         {
            type: 'list',
            name: 'updateExistingEmployeeRole',
            message: 'What is their new role?',
            choices: roleArr,
            when: (answers) => { return (answers.updateEmployeeField === 'Role'); }
         },
         {
            type: 'list',
            name: 'updateRole',
            message: 'What role would you like to update?',
            choices: roleArr,
            when: (answers) => { return (answers.chooseAction === 'Update an existing role'); }
         },
         {
            type: 'list',
            name: 'updateRoleField',
            message: 'What information would you like to update?',
            choices: ['Title', 'Salary', 'Department'],
            when: (answers) => { return (answers.chooseAction === 'Update an existing role'); }
         },
         {
            type: 'input',
            name: 'newRoleField',
            message: 'What is the new value?',
            when: (answers) => { return (answers.chooseAction === 'Update an existing role'); }
         },
         {
            type: 'list',
            name: 'updateDepartment',
            message: 'Which department would you like to update?',
            choices: departmentArr,
            when: (answers) => { return (answers.chooseAction === 'Update an existing department'); }
         },
         {
            type: 'input',
            name: 'newDepartmentName',
            message: 'What is the new department\'s name?',
            when: (answers) => { return (answers.chooseAction === 'Add a new department'); }
         }]);
}

async function runProgram() {
    const answers = await chooseAction();
    switch(answers.chooseAction){
        case 'View all Employees':
            const allEmployees = await Employee.getAll();
            console.table(allEmployees);
            return runProgram();
        case 'View employees by role':
            const roleToViewBy = await Role.findByName(answers.viewByRole);
            const employeesByRole = await Employee.getByRole(roleToViewBy[0].id);
            console.table(employeesByRole);
            return runProgram();
        case 'View employeees by manager':
            var nameArray = answers.viewByManager.split(/\s+/);
            const managerToViewBy = await Employee.findByName(nameArray[0], nameArray[1]);
            const employeesByManager = await Employee.getByManager(managerToViewBy[0].id);
            console.table(employeesByManager);
            return runProgram();
        case 'Add a new employee':
            const newEmployeeFields = await getNewEmployeeFields();
            const roleToInsert = await Role.findByName(newEmployeeFields.role);
            nameArray = newEmployeeFields.manager.split(/\s+/);
            const managerToInsert = await Employee.findByName(nameArray[0], nameArray[1]);
            await Employee.createInDataBase(newEmployeeFields.firstName, newEmployeeFields.lastName, roleToInsert[0].id, managerToInsert[0].id)
            const newEmployee = await Employee.findByName(newEmployeeFields.firstName, newEmployeeFields.lastName);
            console.table(newEmployee);
            return runProgram();
        case 'Update an existing employee\'s information':
            const field = answers.updateEmployeeField;
            var nameArray = answers.updateEmployee.split(/\s+/);
            const employeeToUpdate = await Employee.findByName(nameArray[0], nameArray[1]);
            switch(field){
                case 'Role':
                    console.log(answers.updateExistingEmployeeRole);
                    const newRole = await Role.findByName(answers.updateExistingEmployeeRole);
                    await Employee.updateByID(employeeToUpdate[0].id, `role_id`, newRole[0].id);
                    const updatedEmployee = await Employee.findByName(nameArray[0], nameArray[1]);
                    console.table(updatedEmployee);
                    return runProgram();
                case 'Manager':
                case 'First Name':
                case 'Last Name':
            }
        case 'Delete an existing employee':
        case 'View all roles':
            const allRoles = await Role.getAll('roles');
            console.table(allRoles);
            return runProgram();
        case 'Add a new role':
            const newRoleFields = await getNewRoleFields();
            const departmentToInsert = await Department.findByName(newRoleFields.department);
            await Role.createInDataBase(newRoleFields.name, newRoleFields.salary, departmentToInsert[0].id);
            const newRole = await Role.findByName(newRoleFields.name);
            console.table(newRole);
            return runProgram();
        case 'Update an existing role':
        case 'View all departments':
            const allDepartments = await Department.getAll();
            console.table(allDepartments);
            return runProgram();
        case 'Add a new department':
            await Department.createInDataBase(answers.newDepartmentName);
            const newDepartment = await Department.findByName(answers.newDepartmentName);
            console.table(newDepartment);
            return runProgram();
        case 'Update an existing department name':
    }
}

runProgram();