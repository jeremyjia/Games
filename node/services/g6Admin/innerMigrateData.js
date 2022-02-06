const tag = "[services/g6Admin/innerMigrateData.js_v0.132]"; 
var mysql = require('mysql');
const hash = require('../../utils/hash');
const ULID = require('ulid');
const db = require("../../sequelize/models");
const g6u = db.Group6Users;

const l = require('../../logger');
l.tag(tag);   

exports.toMigrate = async function(reqInf,resolve,Service)
{       
    await _2_migrate_data(reqInf,resolve,Service);
} 

var _2_migrate_data = async function(reqInf,resolve,Service){ 
    var sR = {}; 
    sR.tag = tag;
    sR.reqInf = reqInf;
  
    var _sql = "SELECT * FROM " + reqInf.DB_TABLE_NAME + ";";
  
    var con = mysql.createConnection({
      host: reqInf.DB_HOST, 
      user: reqInf.DB_USER,
      password: reqInf.DB_PASSWORD,
      database: reqInf.DB_NAME
    });
    
    con.connect();
    con.query(_sql, async function (err, result, fields) {
        if (err) {
          sR.err = err;
          resolve(Service.successResponse(sR));    
        } 
        else {
            console.log(result);  
            var r = JSON.stringify(result);
            console.log("xdtest:" + r);
            sR.result = r;
            sR.insertInf = await _insert_into_sqlizeDB(result);
            resolve(Service.successResponse(sR));    
        }         
    }); 
   con.end();  
}

var _insert_into_sqlizeDB = async function(uList){
  var r = {};
  r.v = "v0.11"; 
  r.info = [];

  for(j in uList){
    var i = uList[j];
    var u = {
      UserName: i.UserName,
      EmailAddress: i.EmailAddress
    } 
    const u1 = await g6u.findOne({ where: { UserName: u.UserName } });
    if (u1 === null) {
          const u2 = await g6u.findOne({ where: { EmailAddress: u.EmailAddress } });
          if(u2 === null){
              await _sequelize_create(i);
              r.code = 1;
              r.info.push("created a new user: " + u.UserName) ;
              r.tag = tag;            
          }
          else{
              r.code = -2;
              r.info.push("duplicated email: " + u.EmailAddress);
          }
    } else {
          r.code = -1;
          r.info.push("duplicated name: " + u.UserName);        
    }
  } 
  return r;
}

function  _sequelize_create(user) {
  const u = {
    UserID: ULID.ulid(),
    UserName: user.UserName,
    Password: user.Password,//hash.toHash(user.Password),
    FirstName: user.FirstName,
    LastName: user.LastName,
    EmailAddress: user.EmailAddress,
    Location: user.Location,
    PhoneNumber: user.PhoneNumber,
    VerifyCode: ULID.ulid(),
    DateOfBirth: user.DateOfBirth,
    AgreeTerms: user.AgreeTerms
  };
  
  l.tag1(tag,u);
 
  g6u.create(u)
    .then(data => {
        l.tag1(tag,u);
    })
    .catch(err => {
        l.tag1(tag,u);
    });
}