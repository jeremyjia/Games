var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "xd178090xd"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});