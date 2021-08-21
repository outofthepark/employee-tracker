const mysql = require('mysql2');

// Connect to databases
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'cantor1234',
        database: 'company'
    },
    console.log('Connected to the company database.')
);

class Base{
    constructor() {
        this.ID = -1;
        this.table = `none`;
    }

    findByID(){
        if(id == -1){
            return `This object has not been created in the db yet! Call createInDB on the object to insert it into the db.`
        }
        const sql = `SELECT * FROM ${this.table} where 
        id = ?`;
        const param = this.ID;

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
        name = ?`;
        const param = this.name;

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

    delete(){
        if(id == -1){
            return `This object has not been created in the db yet! Call createInDB on the object to insert it into the db.`
        }
        const sql = `DELETE FROM ${this.table} where 
        id = ?`;
        const param = this.ID;

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

    static getAll(table){
        const sql = `SELECT * FROM ${table}`;
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

    static findByID(id, table){
        const sql = `SELECT * FROM ${table} where 
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

    static findByName(name, table){
        const sql = `SELECT * FROM ${table} where 
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

    static checkNameExists(name, table){
        const sql = `EXISTS(SELECT * FROM ${table} where 
        name = ?)`;
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

    static checkIDExists(id, table){
        const sql = `EXISTS(SELECT * FROM ${table} where 
        id = ?)`;
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

module.exports = Base;