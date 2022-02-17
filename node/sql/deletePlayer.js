const tag = "[sql/deletePlayer.js_v0.34]";
var mysql = require('mysql');

exports.deletePlayer = function(id,resolve,Service){  
  var r = {};
  r.id = id;
  r.endpoint = tag;
  resolve(Service.successResponse(r));    

  //return _old_deletePlayer (h,u,pw,db,id,resolve,Service);
}



var _old_deletePlayer = function(h,u,pw,db,id,resolve,Service){ 
  var sR = " _old_deletePlayer v0.21:   deletePlayer: " + new Date() ;
  console.log(sR);

  var _sql = "DELETE FROM Group6Users WHERE UserID='"+id+ "'";

  var con = mysql.createConnection({
    host: h,//"localhost",
    user: u,
    password: pw,
    database: db
  });
  
  con.connect();
  con.query(_sql, function (err, result, fields) {
      if (err) {
        console.log(err);  
        console.log(err.sqlMessage);  
        sR = err.sqlMessage;
        resolve(Service.successResponse(sR));    
      } 
      else {
          console.log(result);  
          var r = JSON.stringify(result);
          console.log("xdtest:" + r);
          sR = r;
          resolve(Service.successResponse(sR));    
      }         
  }); 
con.end();
  return sR;
}


