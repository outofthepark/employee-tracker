const Base = require('./Base');
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

class Department extends Base{
    constructor(name) {
        super();
        this.name = name;
        this.table = `departments`;
    }

    createInDataBase(){
        if(id != -1){
            return `This object already exists in the db! Find it by calling findByID on the object!`
        }
        const sql = `INSERT INTO ${this.table} (name) 
        VALUES (?,?,?)`;
        const params = [this.name];

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
        var newDepartment = new Department(dbRow.name);
        newDepartment.ID = dbRow.id;
    }
}

module.exports = Department;