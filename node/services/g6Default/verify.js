const tag = "[g6Default/verify.js_v0.23]"; 
const rSQL = require('../../sql/SQL.js'); 
var SqlString = require('sqlstring');
const l = require('../../logger'); 

 l.tag(tag);
 
exports.toVerify =   function(code,resolve,Service){   

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
        var sRes = "<a href='http://localhost:8080/'>link</a>";
        resolve(Service.successResponse(sRes));	             
    });   
}
