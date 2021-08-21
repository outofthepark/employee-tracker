const Department = require('./Department');
const Role = require('./Role');
const Base = require('./Base');
const mysql = require('mysql2');
const { createFromDataBase } = require('./Department');

// Connect to databases
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'cantor1234',
        database: 'company'
    }
);

class Employee extends Base{
    constructor(firstName, lastName, roleID, managerID) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleID = roleID;
        this.managerID = managerID;
        this.table = `employees`;
    }

    get manager(){
        return Employee.createFromDataBase(this.getManagerRow);
    }

    get role(){
        return Role.createFromDataBase(this.getRoleRow);
    }

    get Department(){
        var role = this.role();
        var department = Department.findByID(role.departmentID);
        return Department.createFromDataBase(department)
    }

    createInDataBase(){
        if(id != -1){
            return `This object already exists in the db! Find it by calling findByID on the object!`
        }
        const sql = `INSERT INTO ${this.table} (first_name, last_name, role_id, manager_id) 
        VALUES (?,?,?,?)`;
        const params = [this.firstName, this.lastName, this.roleID, this.managerID];

        return new Promise((resolve, reject)=>{
            db.query(sql, param, (err, result) => {
                if (err) {
                    return reject(err.message);
                }else{
                    return resolve(result);
                }
            });
        });
    }

    static createFromDataBase(dbRow){
        var newEmployee = new Employee(dbRow.first_name, dbRow.last_name, dbRow.role_id, dbRow.manager_id);
        newEmployee.ID = dbRow.id;
    }

    getRoleRow(){
        const sql = `SELECT * FROM roles where 
        id = ?`;
        const param = this.roleID;

        return new Promise((resolve, reject)=>{
            db.query(sql, param, (err, result) => {
                if (err) {
                    return reject(err.message);
                }else{
                    return resolve(result);
                }
            });
        });
    }

    getManagerRow(){
        const sql = `SELECT * FROM employees where 
        id = ?`;
        const param = this.managerID;

        return new Promise((resolve, reject)=>{
            db.query(sql, param, (err, result) => {
                if (err) {
                    return reject(err.message);
                }else{
                    return resolve(result);
                }
            });
        });
    }

    findByName(){
        if(id == -1){
            return `This object has not been created in the db yet! Call createInDB on the object to insert it into the db.`
        }
        const sql = `SELECT * FROM ${this.table} where 
        first_name = ? AND last_name = ?`;
        const params = [this.firstName, this.lastName];

        return new Promise((resolve, reject)=>{
            db.query(sql, param, (err, result) => {
                if (err) {
                    return reject(err.message);
                }else{
                    return resolve(result);
                }
            });
        });
    }

    static findByName(name){
        firstLastArray = name.split(' ');
        return this.findByName(firstLastArray[0], firstLastArray[1])
    }

    static findByName(firstName, lastName){
        const sql = `SELECT * FROM ${this.db} where 
        first_name = ? AND last_name = ?`;
        const params = [firstName, lastName];

        return new Promise((resolve, reject)=>{
            db.query(sql, param, (err, result) => {
                if (err) {
                    return reject(err.message);
                }else{
                    return resolve(result);
                }
            });
        });
    }
}

module.exports = Employee;