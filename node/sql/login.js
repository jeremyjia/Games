const tag = "[sql/login.js_v0.233] "; 
const token = require('../auth/token');
const mysql = require('mysql');
const config = require('../config'); 

const l = require('../logger');
l.tag(tag); 


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
          l.tag1(tag,err);
          sR = err.sqlMessage;
          resolve(Service.successResponse(sR));    
        } 
        else{
            l.tag1(tag,result);

            var n = result.length;
            l.tag1(tag,n);
            if(n>0){    
                sR = "  pw = " + result[0].Password ;
                sR += " loginInf.Password = " + loginInf.Password  ;

                
                if(loginInf.Password ==  result[0].Password){                 
                     
                    const user = {
                        v: tag,
                        id: result[0].UserID ,
                        username: loginInf.UserName, 
                        password: loginInf.Password  
                    }
                                            
                    token.sign({user: user},(_o) => {     
                        s.code = _o.b?1:0;
                        s.token = _o.r;
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
              s.token = "...: wrong password"
              resolve(Service.successResponse(s));    
            } 
        }         
    }); 
	con.end();
}
