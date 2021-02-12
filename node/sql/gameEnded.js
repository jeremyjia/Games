const { parse } = require('querystring');
var mysql = require('mysql');



exports.gameEnded = function (h,u,p,db,game) {
  console.log("game end...");
  var con = mysql.createConnection({
     host: h,
     user: u,
     password: p,
     database: db
  });
  var p1 = game.end_time;
  var p2 = game.winner;
  var p3 = game.competitor_1;
  var p4 = game.competitor_2;
  var _sql = "update Group6Game set end_time='"+p1+ "', winner = '"+p2+ "' where competitor_1 = '"+p3+ "' and competitor_2 = '"+p4+ "'";

  con.connect();
  con.query(_sql, function (err, result, fields) {
    if (err) {
  	  console.log(err);  
  	  console.log(err.sqlMessage);  
    }
    else {
      console.log("Successull ended a game");
    }
  });
  con.end();
}
