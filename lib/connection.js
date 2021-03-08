const mysql = require('mysql');
const dotenv = require('dotenv');


// dotenv to store environment variables
const result = dotenv.config()


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: "3306",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "employee_tracker"
})

if (result.error) {
    throw result.error
  }
   

// get connection
  connection.connect((err) => {
	if (err) throw err;
	console.log(`Connected as id ${connection.threadId}`);
});


  module.exports = connection;
