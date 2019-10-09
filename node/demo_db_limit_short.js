var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "xd178090xd",
  database: "mydb"
});
 
con.connect(function(err) {
  if (err) throw err;
  //Return 5 customers, starting from position 2:
  con.query("SELECT * FROM customers1 LIMIT 2, 5", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});
