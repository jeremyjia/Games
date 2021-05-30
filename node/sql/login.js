const tag = "[sql/login.js_v0.235] "; 
const token = require('../auth/token');
const mysql = require('mysql');
 
const config = require('../config'); 
const hash = require('../utils/hash'); 

exports.g6Login = function(loginInf,resolve,Service)
{
    var sR = tag + new Date() ;
    var s = {};                         
    s.code = 0;
    s.token = "...";

    var u = loginInf.UserName;

    var _sql = "SELECT * FROM Group6Users where UserName = ?";

    
    console.log( tag + "_sql = " + _sql);

    var con = mysql.createConnection(config.oLocalDB);

    con.connect();
    con.query(_sql, u , function (err, result, fields) {
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
                var pwHash =  result[0].Password ; 
                var bMatch = hash.toCompare(loginInf.Password,pwHash);                
                if(bMatch){                 
                     
                    const user = {
                        v: tag,
                        id: result[0].UserID ,
                        username: loginInf.UserName, 
                        password: pwHash  
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
                  s.token = "...: Password error!";
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
