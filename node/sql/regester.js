const tag = "[regester.js_v0.126]";
const { parse } = require('querystring');
var mysql = require('mysql');
const config = require('../config');
var uuidc = require('./uuidc.js');
const ULID = require('ulid');
var SqlString = require('sqlstring');

const hash = require('../utils/hash');
const sgMail = require('../utils/sgMail');

const l = require('../logger');
l.tag(tag);

exports.register = function (user,resolve,Service) {

    l.tag1(tag,Date());
    var con = mysql.createConnection({
        host: config.h,
        user: config.u,
        password: config.pw,
        database: config.db
      });

    con.connect();
	Checkusername(con, user,resolve,Service);
}

function Checkusername(con, user,resolve,Service) {
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
                s.code      = 0;
                s.info       = ' Duplicate Username !!! ' + user.UserName;

                console.log(tag + s.inf );
                resolve(Service.successResponse(s));
				con.end();
            } else {
                console.log(tag + " user.UserID=" +user.UserID);

                var pULID = ULID.ulid();
                var p2 = user.UserName;
                var p3 = hash.toHash(user.Password);
                var p9 = 0;
                var p10 = 0;
                var p4 = user.FirstName;
                var p5 = user.LastName;
                var p6 = user.EmailAddress;
                var p7 = user.Location;
                var p8 = "12345";//user.PhoneNumber;
                var pVerifyCode = ULID.ulid();
                var p11 = user.DateOfBirth;

                var _sql = "INSERT INTO Group6Users(";
                _sql += "UserID,";
                _sql += "AgreeTerms,";
                _sql += "UserName,Password,Coin, Gem, ";
                _sql += "FirstName ,LastName,EmailAddress,Location, PhoneNumber,VerifyCode, DateOfBirth)VALUES (";
                _sql += SqlString.escape(pULID)+ ",";
                _sql += SqlString.escape(user.AgreeTerms)+ ",";
                _sql += SqlString.escape(p2)+ ",";
                _sql += SqlString.escape(p3)+ ",";
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
                        s.hash          = p3;
                        s.emailTo       = p6; 
                        s.userName      = p2;
                        s.AgreeTerms    = user.AgreeTerms;

                        if(p2.charAt(0)!='u'){
                            sgMail.sendMail(s.emailTo,s.userName,pVerifyCode);
                        }
                        resolve(Service.successResponse(s));
                    }
                });
				con.end();
            }
        }
    });
}
