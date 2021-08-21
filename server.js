const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');
const Department = require('./lib/Department');
//const mysql = require('mysql2');
const cTable = require('console.table');

// // Connect to databases
// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'cantor1234',
//         database: 'company'
//     },
//     console.log('Connected to the company database.')
// );


// const employees = `SELECT * FROM employees`;

// db.query(employees, (err, rows) => {
//     if (err) {
//         console.log(err.message);
//     }else{
//         console.table(rows);
//     }
// });





async function runProgram() {

    return inquirer
        .prompt([
        {
            type: 'confirm',
            name: 'confirmNewEmployee',
            message: 'Would you like to enter another employee?',
            default: false
        },
        {
            type: 'list',
            name: 'employeeType',
            message: 'What type of employee do you want to add?',
            choices: ['Engineer', 'Intern'],
            when: ({ confirmNewEmployee }) => confirmNewEmployee
        }]).then((response) =>{
            const rows = await Department.getAll('departments');
            console.log(rows);
        });
        
}
console.log('got here');

runProgram();