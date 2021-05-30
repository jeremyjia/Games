const tag = "[g6Default/getPlayer.js_v0.33]";   
const db = require("../../sequelize/models");
const g6u = db.Group6Users;

var mysql = require('mysql');
const config = require('../../config'); 
const l = require('../../logger'); 
 l.tag(tag);
 
exports.getInfo = async function(id,resolve,Service){ 
  //_oldGetPlayerByUserID (id,resolve,Service);
  await _sqlzGetPlayerByUserID(id,resolve,Service);
}

async function _sqlzGetPlayerByUserID (_UserID,resolve,Service){   
  var l = [];
  const u1 = await g6u.findOne({ where: { UserID: _UserID } });
  if (u1 === null) {
        l.tag1(tag, _UserID + " can't find in database.")
  } else {
        l.push(u1);  
  }
  var r = _makeUserList(l);
  resolve(Service.successResponse(r));    
     
}
function _oldGetPlayerByUserID (id,resolve,Service){   
  var sR = tag+ " --------- UserID =" + id ;
  console.log(sR);

  var _sql = "SELECT * FROM Group6Users where UserID =?" ; 
  var con = mysql.createConnection(config.oLocalDB);
  con.connect();
  con.query(_sql, id, function (err, result, fields) {
      if (err)   {
        console.log(err);  
        console.log(err.sqlMessage);  
        var ro = {};
        ro.sqlMessage = err.sqlMessage;
        ro.Version = "0.0.12";
        resolve(Service.successResponse(ro));    
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
      u.Icon = r[i].IconID;
      u.VerifyCode = r[i].VerifyCode;
      u.IsVerified = r[i].IsVerified;
      u.AgreeTerms = r[i].AgreeTerms;
      u.ReceiveNews = r[i].ReceiveNews;
      l.push(u);
    }
    return l;
  }
  
