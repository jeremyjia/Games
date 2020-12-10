var mysql = require('mysql');


exports.getGamebyUser = function(h,u,pw,db,id,resolve,Service){ 
    var sR = " v0.1:   getGamebyUser : " + new Date() ;
    console.log(sR);

    var _sql = "SELECT * FROM Group6Game where competitor_1 ='"+id+ "' or competitor_2 ='"+id+ "' ";

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
