const tag = "[g6Default/setIcon.js_v0.23*]";

const db = require("../../sequelize/models");
const g6u = db.Group6Users;

const rSQL = require('../../sql/SQL.js'); 
var SqlString = require('sqlstring');
const config = require('../../config'); 
const l = require('../../logger');
const ULID = require('ulid');

 l.tag(tag);
 
exports.setIcon = async function(oBody,resolve,Service){ 
    _sqlz_setIcon(oBody,resolve,Service);
}

async function _sqlz_setIcon(oBody,resolve,Service){ 
    var r = {};
    r.tag = tag;    
    r.code = 1;
    r.UserID = oBody.UserID;
    r.IconID = oBody.IconID;
    l.tag1(tag,r.UserID);

    
    var newData = { 
        "IconID": oBody.IconID
    };
    
    await g6u.update(newData, {
        where: { UserID: oBody.UserID }
      })
    .then(num => {
          if (num == 1) {
              r.message = "set Icon successfully.";
              r.UserIDInDB = "YES"; 
          } else {
            r.message = `num=${num} : `;
            r.UserIDInDB = "NO"; 
          }
    })
    .catch(err => {
            r.message = "Error updating database";
            r.UserIDInDB = "unknown"; 
            resolve(Service.successResponse(r)); 
    });


    resolve(Service.successResponse(r));	
}

function _old_setIcon(oBody,resolve,Service){ 
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