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

class Department{

    static createInDataBase(name){
        const sql = `INSERT INTO departments (name) 
        VALUES (?)`;
        const param = [name];

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

    static getAll(){
        const sql = `SELECT * FROM departments`;
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
        const sql = `SELECT * FROM departments`;
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

    static findByName(name){
        const sql = `SELECT * FROM departments where 
        name = ?`;
        const param = name;

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
        const sql = `SELECT * FROM departments where 
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
}

module.exports = Department;