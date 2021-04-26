var mysql = require('mysql');

var con = mysql.createConnection({
  host: "dev-userdatabase-instance-1.coawyv4mqnwk.us-west-2.rds.amazonaws.com",
  user: "admin",
  password: "group6dev"
});

con.connect();

console.log("Connected!");
/*Create a database named "g6db1":*/
con.query("CREATE DATABASE g6db1", function (err, result) {
  if (err) {
  	console.log("E:" + err);
  	throw err;
  }
  console.log("Database created");
});

con.end();
