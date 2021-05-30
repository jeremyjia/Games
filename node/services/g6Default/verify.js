const tag = "[g6Default/verify.js_v0.34]"; 

const db = require("../../sequelize/models");
const g6u = db.Group6Users;

const rSQL = require('../../sql/SQL.js'); 
var SqlString = require('sqlstring');
const config = require('../../config'); 
const l = require('../../logger'); 

 l.tag(tag);
 
exports.toVerify =   function(req,resolve,Service){   
    _sqlz_2_verify (req,resolve,Service);  
}


async function _sqlz_2_verify(req,resolve,Service){    
    var code = req.code;     

    var r = {};
    r.code = code; 

    var newData = { 
        "IsVerified": "yes"
    };
    
    await g6u.update(newData, {
        where: { VerifyCode: code }
      })
    .then(num => {
          if (num == 1) {
              r.message = "Group6User was updated successfully.";
          } else {
            r.message = `num=${num} : Cannot update database with code=${code}`;
            r.codeInDB = "NO"; 
          }
    })
    .catch(err => {
            r.message = "Error updating database with code=" + code;
            r.codeInDB = "unknown"; 
            resolve(Service.successResponse(r)); 
    });
   
    var url = config.VERIFY_REDIRECT_URL;    
    resolve(Service.redirectResponse(url));	 
}
 

function _old_Verify (req,resolve,Service){   
    var code = req.code;
    
  
    var _sql = "UPDATE Group6Users SET IsVerified='yes'"; 
    _sql += " WHERE VerifyCode=";
    _sql += SqlString.escape(code); 

    rSQL._2RunSQL1(_sql,function(r){
        var o = {};
        var n = r.length;
        o.msg = "- n: n=" + n;
        o.msg = " <a href='http://localhost:8080/'>link</a>";

        if(n==1){
            o.msg = code + " is in the DB"; 
        }
        else if (n==0){
            o.msg = code + " doesn't exist.";
        }
        var url = config.VERIFY_REDIRECT_URL;    
        resolve(Service.redirectResponse(url));	                   
    });   
}
