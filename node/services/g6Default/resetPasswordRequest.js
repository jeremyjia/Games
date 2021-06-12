const tag = "[g6Default/resetPasswordRequest.js_v0.41]";  

const db = require("../../sequelize/models");
const g6u = db.Group6Users;

const rSQL = require('../../sql/SQL.js'); 
var SqlString = require('sqlstring');
const sgMail = require('../../utils/sgMail');

const l = require('../../logger'); 

 l.tag(tag);
 
exports.resetPasswordRequest =   function(emailAddress,resolve,Service){   
  //_oldF(emailAddress,resolve,Service);
  _sqlzF(emailAddress,resolve,Service);
}

async function _sqlzF(emailAddress,resolve,Service){  
    var r = {}; 
    r.emailAddress = emailAddress;
    r.status = "doing.";
    var b = _ValidateEmail(emailAddress);
    r.isOK = b?"YES":"NO";
    r.inDB = "unknown";
    if(b){
      const u1 = await g6u.findOne({ where: { EmailAddress: emailAddress } });
      if (u1 === null) {
          r.inDB = "NO";     
      } else {
          r.code = 1;
          r.inDB = "YES";   
          sgMail.sendMail_4_reset_password(emailAddress,u1.UserName,u1.VerifyCode);     
      }
    }

    resolve(Service.successResponse(r));	 
}

function _oldF(emailAddress,resolve,Service){   
  var o = {};
  o.api = "resetPasswordRequest";
  o.tag = tag;
  o.emailAddress = emailAddress;
  o.isOK = _ValidateEmail(emailAddress)?"YES":"NO";


  var _sql = "SELECT * FROM Group6Users"; 
  _sql += " WHERE EmailAddress=";
  _sql += SqlString.escape(emailAddress); 

  rSQL._2RunSQL1(_sql,function(r){
      var o = {};
      var n = r.length;
      o.msg = "- n: n=" + n;  

      if(n>0){
          o.msg = emailAddress + " is in the DB"; 
          o.r = JSON.stringify(r);
          l.tag1(tag,r);
          sgMail.sendMail_4_reset_password(emailAddress,r[0].UserName,r[0].VerifyCode);
          resolve(Service.successResponse(o));	 
      }
      else if (n==0){
          o.msg = emailAddress + " doesn't exist.";
          l.tag1(tag,o.msg);
          resolve(Service.successResponse(o));	 
      }                
  });       
}

function _ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  } 
  else{
    return (false)
  }
}