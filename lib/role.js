const connection = require('./connection');

const viewRoles= ()=>{
   connection.query(`SELECT * FROM role`, (err, res)=>{
       if(err) throw err;
       console.log('-----------------------');
       console.table(res)
   })
}
  


module.exports = {viewRoles}