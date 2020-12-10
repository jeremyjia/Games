//g6RunSQL.js
var mysql = require('mysql');
//CREATE TABLE User_Info(UserID int,RecordID int, AccountName varchar(255), Password varchar(255),FirstName varchar(255),LastName varchar(255),EmailAddress varchar(255),Location varchar(255), PhoneNumber int, create_date TIMESTAMP, MMR int, Status varchar(255));
var gMo   = "[g6RunSQL.js:v0.1.43] ";

var gHost = "localhost"; var gUser = "root"; var gPW = "group6db"; var gDBName = "g6DB";  
 

exports.createDB = function(res,dbName){
  var tag = "[exports.createDB:: v0.0.21] ";
  res.write(gMo + tag + Date() + "<br>");
  res.write(gMo + tag + "dbName=" + dbName);
  
  res.write("<br> Try: <a href='index.html'>index.html</a>");  
  _createDB4G6(res,gHost,gUser,gPW,dbName);
}


exports.runSQL = function (res,s) {
  var tag = "[exports.runSQL:: v0.0.155] ";  
 
  var _sql = s;
  console.log(tag + _sql); 
 
   var con = mysql.createConnection({ 
      host: gHost,
      user: gUser,
      password: gPW,
      database: gDBName  
    });
     
    con.connect(function(err) {      
      if (err) 
      {
          res.write(gMo + tag + err.sqlMessage); 
          res.end();
          //throw err;
      }   
      else{

          con.query(_sql, function (err, result, fields) {
              if (err)   {
                console.log(err);  
                console.log(err.sqlMessage);  
                res.write(gMo + tag + err.sqlMessage ); 
                res.end();
             //   throw err;
              } 
              else{
                  console.log(result);  
                  var r = JSON.stringify(result);
                  console.log("xdtest:" + r);
                  res.write(r);  
                  res.write(gMo + tag + " OK! " + new Date() ); 
                  res.end();
              }
             
          }); 
      }    
    });  
};
  
 var _createDB4G6 = function(res,mHost,mUser,mPW,dbName){
      var tag = "[_createDB4G6:v0.0.31] ";
      res.write("<br>  ______    "+ tag + dbName + "----" + Date());

      var con = mysql.createConnection({
        host: mHost,
        user: mUser,
        password: mPW
      });

      con.connect(function(err) {
        if (err) 
        {
            console.log(err);  
            console.log(err.sqlMessage);  

            res.write("<br>  ______    "+ tag  + err.sqlMessage + "-----" + Date());
            res.end();
            return;
            //throw err;
        }
        console.log(tag + "Connected!");
        res.write("<br>  ______    "+ tag  + "--Connected!--" + Date());
        /*Create a database named "mydb":*/
        con.query("CREATE DATABASE " + dbName, function (err, result) {
            if (err){
                console.log(err);  
                console.log(err.sqlMessage);  

                res.write("<br>  ______    "+ tag  + err.sqlMessage + "-----" + Date());
                res.end();
               // throw err;
            } 
            else{                 
                console.log("Database created");
                res.write("<br>  ______    "+ tag  + "--created!--" + Date());
                res.end(); 
            }
        });
      });

 } 
