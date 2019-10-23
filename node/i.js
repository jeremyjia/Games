var http = require('http');
var url = require('url');
var fs = require('fs');
var mysql = require('mysql');

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
  else if (req.url == '/show') {
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "xd178090xd",
      database: "mydb"
    });
     
    con.connect(function(err) {      
      if (err) throw err;
      con.query("SELECT name, address FROM customers1", function (err, result, fields) {
        if (err) throw err;
        console.log(result);

        res.write('<table id="myTable">');
        res.write('<tr>');
        res.write('<th>NO.</th>');
        res.write('<th>Name</th>    <th>Country</th>');
        res.write('<th>Del</th>');
        res.write('</tr>');

        for(i in result){
          res.write('<tr>');
          res.write('<td>');
          res.write(i);
          res.write('</td>');
          res.write('<td>');
          res.write(result[i].name);
          res.write('</td>');
          res.write('<td>');
          res.write(result[i].address);
          res.write('</td>');
          res.write('<td>');
          var s = "<button id='x";
          s += i;
          s += "'>";
          s += "X</button>";
          res.write(s);
          res.write('</td>');
          res.write('</tr>'); 
        }
        res.write('</table>');
       // res.write(result);  
        res.end();
      });
    });

  } else {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("[v0.0.23] 404 Not Found: " +filename);
      } 
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }
}).listen(8080);