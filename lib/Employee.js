const Department = require('./Department');
const Role = require('./Role');
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

class Employee {

    static createInDataBase(firstName, lastName, roleID, managerID){
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
        VALUES (?,?,?,?)`;
        const params = [firstName, lastName, roleID, managerID];

        return new Promise((resolve, reject)=>{
            db.query(sql, params, (err, result) => {
                if (err) {
                    return reject(err.message);
                }else{
                    return resolve(result);
                }
            });
        });
    }

    static getAll(){
        const sql = `SELECT * FROM employees`;
        return new Promise((resolve, reject)=>{
            db.query(sql, (err, result) => {
                if (err) {
                    return reject(err.message);
                }else{
                    return resolve(result);
                }
            });
        });
    }

    static getAllInArray(field){
        const sql = `SELECT * FROM employees`;
        return new Promise((resolve, reject)=>{
            db.query(sql, (err, result) => {
                if (err) {
                    return reject(err.message);
                }else{
                    var arr = [];
                    if(field == 'fullName'){
                        result.forEach(row =>{
                            var name = row['first_name'] + ' ' + row['last_name'];
                            arr.push(name);
                        });
                    }else{
                        result.forEach(row =>{
                            arr.push(row[field]);
                        });
                    }
                    return resolve(arr);
                }
            });
        });
    }

    static getByRole(id){
        console.log(id);
        const sql = `SELECT * FROM employees where 
        role_id = ?`;
        const param = id;

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

    static getByManager(id){
        const sql = `SELECT * FROM employees where 
        manager_id = ?`;
        const param = id;

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

    static findByName(firstName, lastName){
        const sql = `SELECT * FROM employees where 
        first_name = ? AND last_name = ?`;
        const params = [firstName, lastName];

        return new Promise((resolve, reject)=>{
            db.query(sql, params, (err, result) => {
                if (err) {
                    return reject(err.message);
                }else{
                    return resolve(result);
                }
            });
        });
    }

    static findByID(id){
        const sql = `SELECT * FROM employees where 
        id = ?`;
        const param = id;

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

    static updateByID(id, field, nuField){
        const sql = `UPDATE employees SET ${field} = ? WHERE id = ?`;
        const params = [nuField, id];

        return new Promise((resolve, reject)=>{
            db.query(sql, params, (err, result) => {
                if (err) {
                    return reject(err.message);
                }else{
                    return resolve(result);
                }
            });
        });
    }

    static deleteByID(id){
        const sql = `DELETE FROM employees where 
        id = ?`;
        const param = id;

        return new Promise((resolve, reject)=>{
            db.query(sql, param, (err, result) => {
                if (err) {
                    return reject(err.message);
                }else{
                    this.id = -1;
                    return resolve(result);
                }
            });
        });
    }
}

module.exports = Employee;