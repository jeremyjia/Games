const tag = "[sql/toMakeFriendRequest.js_v0.31]";
var mysql = require('mysql');
const config = require('../config'); 
const l = require('../logger');
const ULID = require('ulid');

 l.tag(tag);
 
exports.toMakeFriendRequest = function(oBody,resolve,Service){ 
    var sR = tag+ " [toMakeFriendRequest]--------- " + JSON.stringify(oBody);
    l.tag1(tag,sR); 
    
    var rTime = Date();
    var rID = ULID.ulid(rTime);
    var _sql = "INSERT INTO PendingFriends(RequestID,fromID,toID,status,request_time)VALUES ('";
    _sql += rID+ "','"+oBody.FromID+ "','"+oBody.ToID+ "','"+oBody.status+ "','"+rTime+ "' )" ;

    var con = mysql.createConnection(config.oLocalDB);
    con.connect();
    con.query(_sql, function (err, result, fields) {
        if (err)   {
          console.log(err);  
          console.log(err.sqlMessage);  
          sR = err.sqlMessage;
          resolve(Service.successResponse(sR));    
        } 
        else{ 
            var r = JSON.stringify(result); 
            sR = r;
            var o = {};
            o.code = 1;
            o.n = result.length;
            o.str = r;
            resolve(Service.successResponse(o));    
        }         
    }); 
	con.end();
    return sR;
} 
