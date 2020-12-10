const { parse } = require('querystring');
var mysql = require('mysql');



exports.gameStarted = function (h,u,p,db,game) {
  console.log("game start... 2");
  var con = mysql.createConnection({
     host: h,
     user: u,
     password: p,
     database: db
  });
       
  var p1 = game.id;//GameID;
  var p2 = game.competitor_1;
  var p3 = game.competitor_2;
  var p4 = game.start_time;
  console.log("p1=" + p1);
  var _sql = "INSERT INTO Group6Game(GameID, competitor_1,competitor_2,start_time)VALUES ('"+p1+ "','"+p2+ "','"+p3+ "','"+p4+ "')" ;

  con.connect();       
  con.query(_sql, function (err, result, fields) {
    if (err)   {
        console.log("A")
        console.log(err);  
        console.log(err.sqlMessage);  
  	}
  	else {
  		console.log("Successull started a game");
  	}
  });
  con.end();
}

