var mysql = require('mysql');
//CREATE TABLE User_Info(UserID int,RecordID int, AccountName varchar(255), Password varchar(255),FirstName varchar(255),LastName varchar(255),EmailAddress varchar(255),Location varchar(255), PhoneNumber int, create_date TIMESTAMP, MMR int, Status varchar(255));

exports.getUserInfo = function (res,s) {  
  
  var _sql = "SELECT * FROM Group6Users where UserID ='"+s+ "'";
  console.log(_sql)

   var con = mysql.createConnection({
      host: "localhost",
      user: "jack",
      password: "123456",
      database: "group6db"
    });
     
    con.connect(function(err) {      
      if (err) throw err;       
      con.query(_sql, function (err, result, fields) {
          if (err)   {
            console.log(err);  
            console.log(err.sqlMessage);  
            res.write(err.sqlMessage); 
            res.end();
         //   throw err;
          } 
          else{
              console.log(result);  
              var r = JSON.stringify(result);
              console.log("xdtest:" + r);
              res.write("successful" + new Date() ); 
              res.write(r);  
              res.end();

          }
         
      }); 
    });  
};