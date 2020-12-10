const tag = "[sql/toRun.js_v0.21]";
var mysql = require('mysql');
const config = require('../config'); 

 console.log(tag);

exports.toRun = function(sql,resolve,Service){      
    /*
    var r = {};
    r.code = -1;
    r.sql = sql;
    r.msg = "toRun...";
    resolve(Service.successResponse(r));  
    //*/
    var r = _runSQL(sql,resolve,Service);
    return r;
};

function _runSQL(sql,resolve,Service){ 
    var con = mysql.createConnection({
      host: config.h,
      user: config.u,
      password: config.pw,
      database: config.db
    });
  
    con.connect();
    con.query(sql, function (err, result, fields) {
        if (err)   {
          console.log(err);  
          console.log(err.sqlMessage);  
          var r = {};
          r.code = -1;
          r.msg = err.sqlMessage;
          resolve(Service.successResponse(r));    
        } 
        else{
          var s = JSON.stringify(result); 
          var r = {};
          r.code = -1;
          r.sql =sql; 
          r.msg = "OK.";
          r.n = result.length;
          r.str = s;
          resolve(Service.successResponse(r));  
        }
    });
	con.end();
    return 0;
  }
