
 var mysql = require('mysql');


exports.getGameInfo = function(h,u,pw,db,id,resolve,Service){ 
    var sR = " v0.3:   getGameInfo : " + new Date() ;
    console.log(sR + " id=" + id);

    var _sql = "SELECT * FROM Group6Game where GameID ='"+id+ "'";

    var con = mysql.createConnection({
      host: h,
      user: u,
      password: pw,
      database: db
    });
    
    con.connect();
    con.query(_sql, function (err, result, fields) {
        if (err)   {
          console.log(err);  
          console.log(err.sqlMessage);  
          sR = err.sqlMessage;
          resolve(Service.successResponse(sR));    
        } 
        else{
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
