const tag = "[g6Default/sqlzLogin.js_v0.42]"; 
const db = require("../../sequelize/models");
const g6u = db.Group6Users;
const token = require('../../auth/token');
const hash = require('../../utils/hash');
const l = require('../../logger');

 l.tag(tag);
 
exports.login = async function(loginInf,resolve,Service){ 
    const u1 = await g6u.findOne({
         where: { 
            UserName: loginInf.UserName 
         } 
        });
    if (u1 === null) {             
        var r = {};     
        r.tag = tag; 
        r.code = -1; 
        r.UserName = loginInf.UserName;
        r.info = "Can't find user: " + loginInf.UserName;   
        resolve(Service.successResponse(r));       

    } else { 
        var i = {};
        i.loginInf = loginInf;
        i.u = u1;
        _userNameIsOK(i,resolve,Service);     
    }    
} 

var _userNameIsOK = function(i,resolve,Service){
    var bMatch = hash.toCompare(i.loginInf.Password,i.u.Password);
    if(bMatch){                 
                     
        const user = { 
            id: i.u.UserID,
            username: i.loginInf.UserName, 
            password: i.u.Password  
        }
       
        token.sign({user: user},(err, token) => {    
            var s = {};
            s.info = "Now you're logged in.";
            s.code = 1;
            s.token = token;
            s.UserName = user.username; 
            resolve(Service.successResponse(s));
        }); 
    }   
    else{    
        var s = {};
        s.info = tag + " Wrong password.";
        s.code = 0;
        s.token = "...";
        s.userName = i.loginInf.UserName; 
        resolve(Service.successResponse(s));
    }  
}