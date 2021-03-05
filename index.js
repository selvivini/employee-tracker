const inquirer = require('inquirer');
const employee = require('./lib/employee');
const role = require('./lib/role');
const department = require('./lib/department');
const connection = require('./lib/connection');

const init = ()=>{
	 inquirer.prompt([
		{
			name: 'action',
			type: 'list',
			message: 'What would you like to do?',
			choices: [
				'view all employees',
				'view all employees by manager',
				'view all departments',
				'view all roles',
				'Add department',
				'Add role',
				'Add employee',
				'update employee role',
				'update employee manager',
				'Remove employee',
				'Remove department',
				'Remove role',
				'Exit'
			]
			
		}
		
	])
	.then( (answers) => {
		switch (answers.action) {
			case 'view all employees':
				employee.viewAllEmployees()
				init();
                break
			case 'view all employees by manager':
				employee.viewEmployeesBymanager()
				init()
				break
			case 'view all departments':
				department.viewAllDepartments()
				init()
				break
             case 'view all roles':
				 role.viewRoles()
				 init()
				 break
			 case 'Add department':
		     addDepartment()
			 case 'Add role':
			 addRole()
			 break
			 case 'Add employee':
			 addEmployee()
			 break
			 case 'Remove employee':
			 removeEmployee()
			 break
			 case 'Remove department':
			 removeDepartment()
			 break
			 case 'Remove role':
			 removeRole()
			 break
			 case 'update employee role':
			 updateEmployeeRole()
			 break
			 case 'update employee manager':
			 updateEmployeeManager()
             break
			 case 'Exit':
           process.exit();

             
		} 

	});
    
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
   init()
   })
   
   
   
}
const addRole = ()=>{
	inquirer.prompt([
	   {
		   name: 'role',
		   type: 'input',
		   message: "What role name would you like to add?"
	   }
   ]).then((ans)=>{
   const query = `INSERT INTO role SET ?`
   connection.query(query, {name:`${ans.role}` }, (err, res)=>{
	   if(err) throw err
	   
   })
  
   console.log('role added succesfully');
   init()
   })
   
   
   
}
const addEmployee = ()=>{
	inquirer.prompt([
		{
		  name: 'firstName',
		  type: 'input',
		  message: 'what is the employee first name?'
		},
		{
			name: 'lastName',
			type: 'input',
			message: 'what is employee last name'
		},
		{
			name: 'roleId',
			type: 'number',
			message: 'what is employee role id?'
		}
	]).then((answers)=>{
		
		const query = 'INSERT INTO employee SET? '
		connection.query(query, {
          first_name: `${answers.firstName}`,
		  last_name : `${answers.lastName}`,
		  role_id : `${answers.roleId}`

		},(err, res)=>{
			if(err) throw err;
		}
		
		)
		console.log('employee added')
		init()
	})

}


const removeEmployee = ()=>{
	const empNames = [];
	
	const query =`SELECT id, CONCAT(first_name, ' ',last_name) AS employee FROM employee`
	connection.query(query, (err, res)=>{
		if (err) throw err
        res.forEach(empl=>{
	    empNames.push(empl.employee)
		})
		
	
		inquirer.prompt([
		{
			name: 'employeeName',
			type: 'list',
			message:'Which employee you want to remove?',
			choices: empNames
		}
	]).then ((ans)=>{
	  	const deleteemp = res.filter(emp=> emp.employee === ans.employeeName).map(emp=> id =emp.id)
	
		
	  connection.query(`DELETE FROM employee WHERE id = ${parseInt(deleteemp)} `, (err,results)=>{
		  if(err) throw err
		  
	  })
	  console.log('employee removed')
	  init()
	})
	})
     
  
} 
 const removeDepartment= ()=>{
	 const departments = []
	 const query = `SELECT * FROM department `
	 connection.query(query,(err, res)=>{
		 if (err) throw err;
		 
		 res.forEach(dept=> departments.push(dept.name))
		  
		 
		 inquirer.prompt([
			 {
				 name: 'DeptName',
				 type: 'list',
				 message: 'Which department would you like to remove?',
				 choices: departments
			 }
		 ]).then((ans)=>{
			const delDeptId = res.filter(dept=> dept.name === ans.DeptName).map(dept=>id= dept.id)
			connection.query(`DELETE FROM department WHERE id = ${parseInt(delDeptId)}`, (err,results)=>{
				if(err) throw err
			})
			console.log('Department has been removed!')
			init()
		 })
	 })
	

 }

 const removeRole = ()=>{
	const roles = []
	const query = `SELECT * FROM role `
	connection.query(query,(err, res)=>{
		if (err) throw err;
		
		res.forEach(role=> roles.push(role.title))
	
		
		inquirer.prompt([
			{
				name: 'roleName',
				type: 'list',
				message: 'Which role would you like to remove?',
				choices: roles
			}
		]).then((ans)=>{
		   const roleId = res.filter(role=> role.title === ans.roleName).map(role=>id= role.id)
		   
		   connection.query(`DELETE FROM role WHERE id = ${parseInt(roleId)}`, (err,results)=>{
			   if(err) throw err
		   })
		   console.log('role has been removed!')
		   init()
		})
	})
 }

 const updateEmployeeRole= ()=>{
	
	const empNames= [];
	const empRoles= [];
	const roleId = []
	const query = `SELECT employee.id,concat(first_name, " ", last_name) AS employee, role_id , role.title AS role FROM employee
	INNER JOIN role
	ON employee.role_id = role.id`
	connection.query(query, (err, res)=>{
	const result = JSON.parse(JSON.stringify(res))
	console.log(result)
	res.forEach(emp =>{empNames.push(emp.employee), empRoles.push(emp.role), roleId.push(emp.role_id)}  )
    
	inquirer.prompt([
		{
          name: 'empName',
		  type: 'list',
		  message: 'which employee you want to update?',
		  choices: empNames
	     },
		 {
		  name: 'empRoles',
		  type: 'list',
		  message: 'which role would you like to update the employee with?',
		  choices: empRoles
		 }

]).then(answers=>{
	let setEmpId
	let setRoleId
    let empSearch =result.find(res=> res.employee === answers.empName)
    let roleSearch = result.find(res=> res.role === answers.empRoles)
    setEmpId = empSearch.id
	setRoleId = roleSearch.role_id
	
	connection.query(`UPDATE employee SET role_id =${setRoleId}  WHERE id = ${setEmpId} `,(err,res)=>{
		if(err) throw err
	})
	console.log('Updated employee role!')
	init()
})

	})
  }

  const updateEmployeeManager = ()=>{
	 
	 connection.query(`SELECT employee.first_name, employee.last_name, employee.id,concat(first_name, " ", last_name) AS employee FROM employee`,(err,res)=>{
		 if(err) throw err
		
		const empNames = []
		res.forEach(emp=> empNames.push(emp.employee))
		// console.log(empNames)
		
		inquirer.prompt([
			{
				name: 'empName',
				type: 'list',
				message: 'Which employee would you like to update the manager?',
				choices: empNames
			},
			{
				name: 'managerId',
				type: 'number',
				message: "what is employee's new manager's id"


			}
		]).then(ans=>{
			console.log(ans)
		 const result = JSON.parse(JSON.stringify(res))
		 
		let findEmp= result.filter(emp =>emp.employee === ans.empName)
		
		let setEmpId = findEmp[0].id
		
			connection.query(`UPDATE employee SET manager_id= ${ans.managerId} WHERE id = ${setEmpId}`,(err,res)=>{
				{
				if(err) throw err
				}
				console.log('manager updated successfully!')
				init()
			})
		})
	 })
  }
init()



