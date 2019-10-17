var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "xd178090xd",
  database: "mydb"
});
 
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT name, address FROM customers1", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});