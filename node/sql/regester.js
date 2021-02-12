const tag = "[regester.js_v0.113]";
const { parse } = require('querystring');
var mysql = require('mysql');
const config = require('../config'); 
var uuidc = require('./uuidc.js');
const ULID = require('ulid');
var SqlString = require('sqlstring');

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
                var p3 = user.Password;
                var p9 = 0;
                var p10 = 0;
                var p4 = user.FirstName;
                var p5 = user.LastName;
                var p6 = user.EmailAddress;
                var p7 = user.Location;
                var p8 = "12345";//user.PhoneNumber;
                var _sql = "INSERT INTO Group6Users(UserID,UserName,Password,Coin, Gem, FirstName ,LastName,EmailAddress,Location, PhoneNumber)VALUES ("+ SqlString.escape(pULID)+ ","+SqlString.escape(p2)+ ","+SqlString.escape(p3)+ ","+SqlString.escape(p9)+ ","+SqlString.escape(p10)+ ","+SqlString.escape(p4)+ ","+SqlString.escape(p5)+ ","+SqlString.escape(p6)+ ","+SqlString.escape(p7)+ ","+SqlString.escape(p8)+ " )" ;

                console.log(tag + "_sql=" +_sql);

                con.query(_sql, function (err, result, fields) {
                    if (err)   {  
                        var s       = {};
                        s.code = 0;
                        s.info = err.sqlMessage;
                        resolve(Service.successResponse(s));  
                    }
                    else {
                        var s       = {};
                        s.code      = 1;
                        s.info       = "Successully added a new user:"+p2;
                        resolve(Service.successResponse(s));   
                    }
                });    
				con.end();
            } 
        }
    });
}  
