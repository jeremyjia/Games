const tag = "[g6Default/getPlayer.js_v0.22]"; 
var mysql = require('mysql');
const config = require('../../config'); 
const l = require('../../logger'); 
 l.tag(tag);
 
exports.getInfo = function(id,resolve,Service){  
    var sR = tag+ " --------- UserID =" + id ;
    console.log(sR);
 
    var _sql = "SELECT * FROM Group6Users where UserID =?" ; 
    var con = mysql.createConnection({
                host: config.h,
                user: config.u,
                password: config.pw,
                database: config.db
    });
    con.connect();
    con.query(_sql, id, function (err, result, fields) {
        if (err)   {
          console.log(err);  
          console.log(err.sqlMessage);  
          sR = err.sqlMessage;
          resolve(Service.successResponse(sR));    
        } 
        else{  
            var r = _makeUserList(result);
            resolve(Service.successResponse(r));    
        }         
    }); 
	  con.end();
    return sR;
}
function _makeUserList (r){  
    var l = [];
    for(i in r){
      var u = {}; 
      u.Version = "0.0.12";
      u.UserName = r[i].UserName;
      u.UserID = r[i].UserID;
      u.IconID = r[i].IconID;
      u.VerifyCode = r[i].VerifyCode;
      u.IsVerified = r[i].IsVerified;
      l.push(u);
    }
    return l;
  }
  
