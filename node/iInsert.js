
var mysql = require('mysql');

exports.AddRow = function (res,tb) {
	console.log("insert 1:" + tb); 
  res.write('<br> to AddRow:  ...' + tb); 
  var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "xd178090xd",
          database: "mydb"
  });
 
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers1 (name, address) VALUES ('insert test', 'a test 1')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
};