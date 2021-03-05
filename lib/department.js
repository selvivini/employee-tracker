const connection = require('./connection');
const inquirer = require('inquirer');


const viewAllDepartments= ()=>{
    const query= `SELECT * FROM department`
    connection.query(query, (err, res)=>{
        if (err) throw err;
        console.log(`---------------------------------`)
        console.table(res)
    })
}


    
    
    
const utilizedBudget = ()=>{
    query= `SELECT SUM(salary),role.department_id, department.name from role 
    INNER JOIN department
    on role.department_id = department.id group by department.name`
    connection.query(query, (err,res)=>{
        if(err) throw err
        console.log(`----------------------------------------`)
        console.table(res)
    })
}



module.exports = {viewAllDepartments , utilizedBudget}