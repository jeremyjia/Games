var express = require('C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\express');
var app = express();
var fs = require("fs");

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

var server = app.listen(8091, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App,address is http://%s:%s", host, port)

})