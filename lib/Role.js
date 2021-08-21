const Base = require('./Base');
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

class Role extends Base{
    constructor(name, salary, departmentID) {
        super();
        this.name = name;
        this.salary = salary;
        this.departmentID = this.departmentID;
        this.table = `roles`;
    }

    get Department(){
        return Department.createFromDataBase(this.getDepartmentRow);
    }

    createInDataBase(){
        if(id != -1){
            return `This object already exists in the db! Find it by calling findByID on the object!`
        }
        const sql = `INSERT INTO ${this.table} (name, salary, department_id) 
        VALUES (?,?,?)`;
        const params = [this.name, this.salary, this.departmentID];

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
        var newRole = new Role(dbRow.name, dbRow.salary, dbRow.department_id);
        newRole.ID = dbRow.id;
    }

    getDepartmentRow(){
        const sql = `SELECT * FROM roles where 
        id = ?`;
        const param = this.departmentID;

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