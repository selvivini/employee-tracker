const inquirer = require('inquirer');
const employee = require('./lib/employee');
const role = require('./lib/role');
const department = require('./lib/department');

const init = ()=>{inquirer
	.prompt([
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
				'Remove employee',
				'Remove department',
				'Remove role',
				'Exit'
			]
		}
	])
	.then((answers) => {
		switch (answers.action) {
			case 'view all employees':
				employee.viewAllEmployees()
                break
			case 'view all employees by manager':
				employee.viewEmployeesBymanager()
				break
			case 'view all departments':
				department.viewAllDepartments()
				break
             case 'view all roles':
				 role.viewRoles()
				 break
            case 'Exit':
                process.exit();

             
		} 
        init()
	});
    
}
// let viewAllEmployees = () => {
	
// 	connection.query('SELECT * FROM employee', (err, res) => {
// 		if (err) throw err;
// 		console.table(res)
//         connection.end()
// 	});
// };

init();

