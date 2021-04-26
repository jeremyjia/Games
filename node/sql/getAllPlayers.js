const tag = "[sql/getAllPlayers.js_v0.25]";
var mysql = require('mysql');
const config = require('../config');
const l = require('../logger');

 l.tag(tag);

exports.getAllPlayers = function(resolve,Service){
    var sR = tag+ " [getAllPlayers]--------- " + Date();
    l.tag1(tag,sR);

    var _sql = "SELECT * FROM Group6Users";

    var con = mysql.createConnection({ host: config.h, user: config.u, password: config.pw,  database: config.db});
    con.connect(function(err) {
      if (err){
            l.tag1(tag,err);
            resolve(Service.rejectResponse(err));
      }
      else{
            con.query(_sql, function (err, result, fields) {
              if (err)   {
                  resolve(Service.rejectResponse(err));
              }
              else{
                  sR = result;
                  var l = _makeUserList(result);
                  var o = {};
                  o.code = 1;
                  o.n = l.length;
                  o.str = l;
                  resolve(Service.successResponse(o));
              }
              con.end();
          });
      }
    });

    return sR;
}

function _makeUserList (r){
  var l = [];
  for(i in r){
    var u = {};
    u.Version = "0.0.1";
    u.UserName = r[i].UserName;
    u.UserID = r[i].UserID;
    u.DateOfBirth = r[i].DateOfBirth;
    u.EmailAddress = r[i].EmailAddress;
    u.VerifyCode = r[i].VerifyCode;
    u.AgreeTerms = r[i].AgreeTerms;
    l.push(u);
  }
  return l;
}
