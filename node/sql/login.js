const tag = "[sql/login.js_v0.231] "; 
const token = require('../auth/token');
const mysql = require('mysql');
const config = require('../config'); 

exports.g6Login = function(loginInf,resolve,Service)
{
    var sR = tag + new Date() ;
    var s = {};                         
    s.code = 0;
    s.token = "...";

    var _sql = "SELECT * FROM Group6Users where UserName ='"+loginInf.UserName+ "'";

    
    console.log( tag + "_sql = " + _sql);

    var con = mysql.createConnection({
      host: config.h,
      user: config.u,
      password: config.pw,
      database: config.db
    });

    con.connect();
    con.query(_sql, function (err, result, fields) {
        if (err)   {
          console.log(err);  
          console.log(err.sqlMessage);  
          sR = err.sqlMessage;
          resolve(Service.successResponse(sR));    
        } 
        else{
            console.log(result);  
            var r = JSON.stringify(result);
            console.log("query: " + r);
            var l = result.length;
            if(l>0){    
                sR = "  pw = " + result[0].Password ;
                sR += " loginInf.Password = " + loginInf.Password  ;

                
                if(loginInf.Password ==  result[0].Password){                 
                     
                    const user = {
                        v: tag,
                        id: result[0].UserID ,
                        username: loginInf.UserName, 
                        password: loginInf.Password  
                    }
                   
                    token.sign({user: user},(err, token) => {    
                        s.code = 1;
                        s.token = token;
                        s.userName = user.username;
                        s.userID = user.id;
                        resolve(Service.successResponse(s));
                    }); 
                }   
                else{ 
                  resolve(Service.successResponse(s));
                }          
            }   
            else{  
              s.code = 0;
              s.token = "...: no user."
              resolve(Service.successResponse(s));    
            } 
        }         
    }); 
	con.end();
}
