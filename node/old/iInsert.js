
var mysql = require('mysql');
var nAdd = 0;
exports.AddRow = function (res,tb,a) {
	console.log("v0.22->insert 1:" + tb + ":a[0]="+a[0] + ":a.length="+ a.length); 
  var b = a[1].split("&");
  console.log("b.length="+b.length);
  var c = [];
  for(i in b){
    console.log("b["+i+"]=" + b[i]);
    var l = b[i].split("=");
    c[i]=l[1];
  }

  res.write('<br> to AddRow:  ...' + tb); 
  var con = mysql.createConnection({
          host: "localhost",
          user: "jack",
          password: "123456",
          database: "group6db"
  });
 
  con.connect();
  console.log("Connected!");
  var d = new Date();
  nAdd++;
  var sql = "INSERT INTO customers1 (name, address) VALUES ('";
  sql += c[0]; 
  sql += "',"
  sql +="'";
  sql += c[1];
  sql += "')";
  console.log("sql="+sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  con.end();
};
