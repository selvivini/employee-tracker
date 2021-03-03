var connection = require('./connection');
const table = require('console.table');



let viewAllEmployees = ()=>{
  const query = 
  `SELECT employee.id, employee.first_name, 
  employee.last_name, role.title, department.name AS department,role.salary FROM employee 
  LEFT JOIN role on employee.role_id = role.id 
  LEFT JOIN department on role.department_id = department.id`
   connection.query(query, (err, res)=>{
        if(err) throw err;
      console.log('-----------------------------------------------')
      console.table(res)
    })
   
}

const viewEmployeesBymanager= ()=>{
  const query= `SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager FROM employee as e1
  LEFT JOIN role on e1.role_id = role.id
  LEFT JOIN department on role.department_id = department.id
  LEFT JOIN employee as e2 on e2.id = e1.manager_id`
  connection.query(query, (err,res)=>{
    if (err) throw err;
    console.log(`-----------------------------------`);
    console.table(res);
  })
  
}




module.exports = {viewAllEmployees,viewEmployeesBymanager}