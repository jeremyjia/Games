const tag = "[g6Default/getPlayer.js_v0.35]";   
const db = require("../../sequelize/models");
const g6u = db.Group6Users;

var mysql = require('mysql');
const config = require('../../config'); 
const l = require('../../logger'); 
 l.tag(tag);
 
exports.getInfo = async function(id,resolve,Service){  
  await _sqlzGetPlayerByUserID(id,resolve,Service);
}

async function _sqlzGetPlayerByUserID (_UserID,resolve,Service){   
  var ls = [];
  const u1 = await g6u.findOne({ where: { UserID: _UserID } });
  if (u1 === null) {
        l.tag1(tag, _UserID + " can't find in database.")
  } else {
        ls.push(u1);  
  }
  var r = _makeUserList(ls);
  resolve(Service.successResponse(r));    
     
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
  
