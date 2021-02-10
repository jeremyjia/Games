const tag = "[nodeapp.js_v0.32]";

var http = require('http');
const l1 = require('./nodelib/l1.js');

console.log(tag + " __dirname = " + __dirname + Date() );

http.createServer(function (req, res) {
  l1.f1(req,res);
  
}).listen(8080)
