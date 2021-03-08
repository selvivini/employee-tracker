const connection = require('./connection');



// function to view all roles
const viewRoles= ()=>{
   connection.query(`SELECT * FROM role`, (err, res)=>{
       if(err) throw err;
       console.log('-----------------------');
       console.table(res)
   })
}
  


module.exports = {viewRoles}