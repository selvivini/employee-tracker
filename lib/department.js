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

const addDepartment = ()=>{
     inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: "What department name would you like to add?"
        }
    ]).then((ans)=>{
    const query = `INSERT INTO department SET ?`
    connection.query(query, {name:`${ans.department}` }, (err, res)=>{
        if(err) throw err
       
    })
   
    console.log('Department added succesfully');

    })
    
    
    
}



module.exports = {viewAllDepartments }