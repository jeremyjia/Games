var mysql = require('mysql');

var v = "0.0.141";
var myHost = "localhost";//"mysql";
var con = mysql.createConnection({
  host: myHost,
  user: "root",
  password: "group6db"

});

con.connect(function(err) {

  console.log("Connecting database test: " + v);
  if (err){
    	console.log(myHost +" : " + err.sqlMessage);
    	return;
        // throw err;	
    } 
  console.log(myHost +" : " + "Connected!");
  /*Create a database named "mydb":*/
  var dbName = "ggg";
  con.query("CREATE DATABASE " + dbName, function (err, result) {
    if (err){
    	console.log(err.sqlMessage);
    	return;
        // throw err;	
    } 
    console.log(dbName + " Database created");
  });
});
