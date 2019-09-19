var http = require('http');
var dt 		= require('./module1');
var url		= require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("dt:" + dt.myDateTime() + "<br>");
  res.write("url:" + req.url + "<br>");
  var q = url.parse(req.url, true).query;
  res.write(q.a + "<br>");
  res.end('Hello World! by xd.');
}).listen(8080);