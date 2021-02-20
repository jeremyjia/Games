const tag = "[g6Admin/signin.js_v0.24]";
const token = require('../../auth/token');
const config = require('../../config');

const l = require('../../logger');
l.tag(tag);   

exports.signin = function(reqInf,resolve,Service)
{
    var r = {};
    r.code = -1; 
	if (config.PRODUCTION) {
		r.token = "...";
		r.msg = "Not available in production deployment"
		resolve(Service.successResponse(r));
	}
       
    const user = {
        v: tag, 
        username: reqInf.AdminName, 
        password: reqInf.Password  
    }   
 
    if(reqInf.Password ==  "admin" && reqInf.AdminName == "admin"){                
                      
        token.sign({user: user},(err, token) => {    
            r.code = 1;
            r.token = token;
            r.userName = user.username;
            r.msg = "OK!";
            resolve(Service.successResponse(r));
        }); 
    }   
    else{   
        r.code = -1;
        r.token = "...";
        r.userName = user.username;
        r.msg = "Error user name or passwaord.";
        resolve(Service.successResponse(r));
    }       
    return r;
}
