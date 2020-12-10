var http = require('http');
var url = require('url');
var fs = require('fs');
var mysql = require('mysql');

var iShow = require('./iShow');
var iInsert = require('./iInsert');

http.createServer(function (req, res) {
  console.log(req.url);
  var xdURL = req.url;
  var a = xdURL.split("?");
  var b = a[1];
  console.log(a[0]);

  if (a[0] == '/delete') { 
      var xdAddr = "Lowstreet 4";
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "xd178090xd",
        database: "mydb"
      });
     
      con.connect(function(err) {
        if (err) throw err;
        //var sql = "DELETE FROM customers1 WHERE address = 'Mountain 21'";
        var sql = "DELETE FROM customers1 WHERE " + b;
        var sql1 = sql.replace(/%27/g,"'");
        var sql2 = sql1.replace(/%20/g," "); 
        console.log(sql2);
        con.query(sql2, function (err, result) {
          if (err) throw err;
          console.log("Number of records deleted: " + result.affectedRows);
        });
      });

      res.write('to do: delete...'); 

      res.end();
  }
  else if (req.url == '/insert') { 
    res.write('to do: add...'); 
    iInsert.AddRow(res,"customers1"); 
    res.end();
  } 
  else if (req.url == '/show') { 
    iShow.showTable(res,"customers1");
  } else {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("[v0.0.23] 404 Not Found: " +filename);
      }
      console.log("filename=" + filename); 
      res.writeHead(200, {'Content-Type': 'text/html'});

      //res.writeHead(200, {'Content-Type': 'image/jpeg'});

      //res.writeHead(200, {'Content-Type': 'audio/mp3'});
      res.write(data);
      return res.end();
    });
  }
}).listen(8080);