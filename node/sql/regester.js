const tag = "[regester.js_v0.143]";
const { parse } = require('querystring');
var mysql = require('mysql');
const config = require('../config');
var uuidc = require('./uuidc.js');
const ULID = require('ulid');
var SqlString = require('sqlstring');

const hash = require('../utils/hash');
const sgMail = require('../utils/sgMail');
const db = require("../sequelize/models");
const g6u = db.Group6Users;

const l = require('../logger');
l.tag(tag);

exports.register = function (user,resolve,Service) {

    l.tag1(tag,Date());
    var con = mysql.createConnection(config.oLocalDB);

    con.connect();
	_step1_checkUserName(con, user,resolve,Service);
}

function _step1_checkUserName(con, user,resolve,Service) {
    l.tag1(tag,user.UserName);
    var _sql = "SELECT * FROM Group6Users where username ="+SqlString.escape(user.UserName);
    con.query(_sql, function (err, result, fields) {
        if (err)  {
            console.log(err);
            console.log(err.sqlMessage);

            var s       = {};
            s.code = 0;
            s.info = err.sqlMessage;
            resolve(Service.successResponse(s));
			con.end();
            return err
        }
        else {
            if (result.length > 0) {
                var s       = {};
                s.code      = -1;
                s.info       = 'Duplicate Username:' + user.UserName;

                console.log(tag + s.inf );
                resolve(Service.successResponse(s));
				con.end();
            } else {
                _step2_checkEmail(con, user,resolve,Service);
            }
        }
    });
}
function _step2_checkEmail(con, user,resolve,Service) { 
    var _sql = "SELECT * FROM Group6Users where EmailAddress =";
    _sql += SqlString.escape(user.EmailAddress);
    con.query(_sql, function (err, result, fields) {
        if (err)  {
            console.log(err);
            console.log(err.sqlMessage);

            var s       = {};
            s.code = 0;
            s.info = err.sqlMessage;
            resolve(Service.successResponse(s));
			con.end();
            return err
        }
        else {
            if (result.length > 0) {
                var s       = {};
                s.code      = -2;
                s.info       = user.EmailAddress + ' has been used to register.';

                console.log(tag + s.inf );
                resolve(Service.successResponse(s));
				con.end();
            } else {
                _step3_insertUserIntoDB(con, user,resolve,Service);
            }
        }
    });
}
 

function _step3_insertUserIntoDB(con, user,resolve,Service) {
    
    var pULID = ULID.ulid();
    var p2 = user.UserName;
    var hashPW = hash.toHash(user.Password);
    var p9 = 0;
    var p10 = 0;
    var p4 = user.FirstName;
    var p5 = user.LastName;
    var p6 = user.EmailAddress;
    var p7 = user.Location;
    var p8 = "12345";//user.PhoneNumber;
    var pVerifyCode = ULID.ulid();
    var p11 = user.DateOfBirth;

    _sequelize_create(user);

    var _sql = "INSERT INTO Group6Users(";
    _sql += "UserID,";
    _sql += "AgreeTerms,";
    _sql += "ReceiveNews,";
    _sql += "UserName,Password,Coin, Gem, ";
    _sql += "FirstName ,LastName,EmailAddress,Location, PhoneNumber,VerifyCode, DateOfBirth)VALUES (";
    _sql += SqlString.escape(pULID)+ ",";
    _sql += SqlString.escape(user.AgreeTerms)+ ",";
    _sql += SqlString.escape(user.ReceiveNews)+ ",";
    _sql += SqlString.escape(p2)+ ",";
    _sql += SqlString.escape(hashPW)+ ",";
    _sql += SqlString.escape(p9)+ ","+SqlString.escape(p10)+ ",";
    _sql += SqlString.escape(p4)+ ","+SqlString.escape(p5)+ ",";
    _sql += SqlString.escape(p6)+ ","+SqlString.escape(p7)+ ",";
    _sql += SqlString.escape(p8)+",";
    _sql += SqlString.escape(pVerifyCode)+",";
    _sql += SqlString.escape(p11);
    _sql += ")" ;

    console.log(tag + "_sql=" +_sql);

    con.query(_sql, function (err, result, fields) {
        if (err)   {
            var s       = {};
            s.code = 0;
            s.info = err.sqlMessage;
            resolve(Service.successResponse(s));
        }
        else {
            var s           = {};
            s.code          = 1; 
            s.hash          = hashPW;
            s.emailTo       = p6; 
            s.userName      = p2;
            s.AgreeTerms    = user.AgreeTerms;
            s.ReceiveNews    = user.ReceiveNews;

            if(p2.charAt(0)!='u'){
                sgMail.sendMail_4_verify_code(s.emailTo,s.userName,pVerifyCode);
            }
            resolve(Service.successResponse(s));
        }
    });
    con.end();
}


function  _sequelize_create(user) {
    const u = {
      UserName: user.UserName,
      Password: hash.toHash(user.Password),
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
          //
      })
      .catch(err => {
          l.tag1(tag,u);
      });

}