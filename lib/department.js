const connection = require('./connection');

const viewAllDepartments= ()=>{
    const query= `SELECT * FROM department`
    connection.query(query, (err, res)=>{
        if (err) throw err;
        console.log(`---------------------------------`)
        console.table(res)
    })
}




module.exports = {viewAllDepartments}