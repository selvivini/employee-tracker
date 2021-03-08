const connection = require('./connection');
const inquirer = require('inquirer');

//  function to view all departments
const viewAllDepartments= ()=>{
    const query= `SELECT * FROM department`
    connection.query(query, (err, res)=>{
        if (err) throw err;
        console.log(`---------------------------------`)
        console.table(res)
    })
}


    
    
     // function to view consolidated salaries of all departments
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