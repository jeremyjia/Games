const tag = "[g6Default/setIcon.js_v0.14]";
const rSQL = require('../../sql/SQL.js'); 
var SqlString = require('sqlstring');
const config = require('../../config'); 
const l = require('../../logger');
const ULID = require('ulid');

 l.tag(tag);
 
exports.setIcon = async function(oBody,resolve,Service){ 
    l.tag1(tag,JSON.stringify(oBody));
    var o = {};
    o.code = 1;
    o.IconID = oBody.IconID;
    o.str = " 2 do setIcon ...";  
    
    var _sql = "UPDATE Group6Users SET IconID=";
    _sql += SqlString.escape(oBody.IconID);
    _sql += " WHERE UserID=";
    _sql += SqlString.escape(oBody.UserID); 

    rSQL._2RunSQL1(_sql,function(r){
            l.tag1(tag,"to do setIcon: run sql=" + _sql);
            l.tag1(tag,"r=" + r);
            resolve(Service.successResponse(o));	             
    });  
}
