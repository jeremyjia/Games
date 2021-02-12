
var mysql = require('mysql');
var nAdd = 0;
exports.DeleteRow = function (res,tb,address) {
	console.log("[v0.3]========== DeleteRow:" + tb +"-" +address);  
  var con = mysql.createConnection({
        host: "localhost",
        user: "jack",
        password: "123456",
        database: "group6db"
    });
     
      con.connect(function(err) {
        if (err) throw err;
        //var sql = "DELETE FROM customers1 WHERE address = 'Mountain 21'";
        var sql = "DELETE FROM customers1 WHERE " + address;
        var sql1 = sql.replace(/%27/g,"'");
        var sql2 = sql1.replace(/%20/g," "); 
        console.log(sql2);
        con.query(sql2, function (err, result) {
          if (err) throw err;
          console.log("Number of records deleted: " + result.affectedRows);
        });
      });
};