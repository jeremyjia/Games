const tag = "[sql/getAllPlayers.js_v0.34]";
var mysql = require('mysql');
const config = require('../config');

const db = require("../sequelize/models");
const g6u = db.Group6Users;

const l = require('../logger');

 l.tag(tag);

exports.getAllPlayers = function(resolve,Service){
    var sR = tag+ " [getAllPlayers]--------- " + Date();
    l.tag1(tag,sR);
    //_getAllPlayers(resolve,Service);
    _sequelize_getAllPlayers(resolve,Service);

    return sR;
}

function _getAllPlayers(resolve,Service){
  var _sql = "SELECT * FROM Group6Users";

  var con = mysql.createConnection(config.oLocalDB);
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
}

function _sequelize_getAllPlayers(resolve,Service){

  const UserName = null;
  var condition = UserName ? { UserName: { [Op.like]: `%${UserName}%` } } : null;

  g6u.findAll({ where: condition })
    .then(data => {    
      var l = _makeUserList(data);
      var o = {};
      o.code = 1;
      o.n = l.length;
      o.str = l; 
      resolve(Service.successResponse(o));
    })
    .catch(err => {       
      var o = {};
      o.code = 0;
      o.err = err;
      resolve(Service.successResponse(o));
  });
 
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
