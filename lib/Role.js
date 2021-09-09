const Department = require('./Department');
const mysql = require('mysql2');

// Connect to databases
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'cantor1234',
        database: 'company'
    }
);

class Role{

    static createInDataBase(title, salary, departmentID){
        const sql = `INSERT INTO roles (title, salary, department_id) 
        VALUES (?,?,?)`;
        const params = [title, salary, departmentID];

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
        const sql = `SELECT * FROM roles`;
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
        const sql = `SELECT * FROM roles`;
        return new Promise((resolve, reject)=>{
            db.query(sql, (err, result) => {
                if (err) {
                    return reject(err.message);
                }else{
                    var arr = [];  
                        result.forEach(row =>{
                            arr.push(row[field]);
                        });
                    return resolve(arr);
                }
            });
        });
    }

    static getByDepartment(departmentID){
        const sql = `SELECT * FROM roles where 
        id = ?`;
        const param = departmentID;

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

    static findByName(title){
        const sql = `SELECT * FROM roles WHERE title = ?`;
        const param = title;

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

    static findByID(id){
        const sql = `SELECT * FROM roles WHERE id = ?`;
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
}

module.exports = Role;