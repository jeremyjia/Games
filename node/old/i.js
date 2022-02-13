const tag = "[i.js: v0.31] ";
console.log(tag);

var http = require('http');
var url = require('url');
var fs = require('fs'); 

var iShow = require('./iShow');
var iInsert = require('./iInsert');
var iDelete = require('./iDelete');
var g6RunSQL = require('./g6RunSQL');
var regester = require('../sql/regester');
var getUserInfo = require('./getUserInfo');
var gameStarted = require('./gameStarted');
var gameEnded = require('./gameEnded');
var api = require('./api/index');
const SQL = require('../sql/SQL');

var n = 0; 


http.createServer(function (req, res) {

  console.log(req.url);
  var xdURL = req.url;
  console.log(tag + xdURL);
  var a = xdURL.split("?");
  var b = a[1];
  console.log(a[0]);
  
  var c = a[0].split("/");


  var h = "localhost"; var u = "root"; var pw = "group6db"; var db = "g6DB";  
//var h = "dev-userdatabase-instance-1.coawyv4mqnwk.us-west-2.rds.amazonaws.com"; var u = "admin"; var pw = "group6dev"; var db = "g6DB";
 // SQL.init(h,u,pw,db);

  if(c[1] === 'api1'){ 
    var sr = "api: v0.21 \n"; 
    console.log(sr);
    res.write(sr); 
    api.run(a[0],req,res);
    //res.end();
  }


  else if (a[0] == '/delete') {  
      iDelete.DeleteRow(res,"customers1",b);      

      res.write('to do: delete...'); 
      res.end();
  }
  else if (a[0] == '/api/getUserInfo') { 
    var z = b.split("=");
    console.log(z[1]);
    getUserInfo.getUserInfo(res, z[1]);  
  } 
  else if (a[0] == '/api/test1') { 
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(result);
          //  res.end(`Parsed data belonging to ${result.fname}`);
        });
    } 

    var o = req.headers;// { "name":"John", "age":30, "car":null };
    var r = JSON.stringify(o);
    console.log("xdtest:" + r);
    res.write(r);  
    res.end();
  } 
  else if (a[0] == '/insert') { 
    res.write('to do: add...'); 
    iInsert.AddRow(res,"customers1",a); 
    res.end();
  } 
  else if (a[0] == '/g6CreateDB') {  
    if(!a[1]) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(tag + Date() + "<br> Try: <a href='" + xdURL + "?dbName=g6DB'>" + xdURL + "?dbName=g6DB</a>");
      res.write("<br> Try: <a href='index.html'>index.html</a>");
      res.write("<br> Try: <a href='i630.html'>i630.html</a>");
      res.end();
    }
    else{
        console.log(a[1]);
        var a1 = a[1].split("=");
        var a2 = a1[1];
        var a3 = a2.replace(/%20/g," ");  
        var a4 = a3.replace(/%27/g,"'");  
        var a5 = a4.replace(/%22/g,'"');  

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(tag + "dbName="+a5+"<br>=====================<br><br>"); 

        var dbName = a5;   
        g6RunSQL.createDB(res,dbName); 

    }
  } 
  else if (a[0] == '/g6RunSQL') {   
    var a1 = a[1].split("="); 
    var a2 = a1[1];
    var a3 = a2.replace(/%20/g," ");  
    var a4 = a3.replace(/%27/g,"'");  
    var a5 = a4.replace(/%22/g,'"');  
    res.write(tag + " sql="+a5+"<br>=====================<br><br>"); 

    var s = a5;   
    g6RunSQL.runSQL(res,s); 
    
  } 
  else if (a[0] == '/gameStarted') { 
    gameStarted.runSQL(req,res);    
  } 
  else if (a[0] == '/gameEnded') { 
    gameEnded.runSQL(req,res);    
  } 
  else if (a[0] == '/regester') { 
    regester.runSQL(req,res);    
  } 
  else if (a[0] == '/getUserInfo') { 
    console.log("testforswegger");
    getUserInfo.getUserInfo(res, z[1]);    
  } 
  else if (req.url == '/show') { 
    console.log("filename=qweeqweqwe123");
    res.writeHead(404, {'Content-Type': 'text/html'});
    return res.end("[v0.0.27]: " +filename);
    //iShow.showTable(res,"customers1");
  } else if (req.url == '/get'){
    console.log("getqweqwe123");
    n++;
    var sr = "api: " + n;
    console.log(sr);
    res.write(sr); 
    api.get(req,res);
    res.end();
  }
  else {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(tag + "404 Not Found: " +filename);
        res.write("<br> Try: <a href='index.html'>index.html</a>");
        return res.end();
      }
      console.log("filename=" + filename); 
      res.writeHead(200, {'Content-Type': 'text/html'});

      //res.writeHead(200, {'Content-Type': 'image/jpeg'});

      //res.writeHead(200, {'Content-Type': 'audio/mp3'});
      res.write(data);
      return res.end();
    });
  }
}).listen(3000);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/json';//'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
            
        let body = '';
        request.on('data', chunk => {
          console.log("chunk=" + chunk); 
            body += chunk.toString();
        });
        request.on('end', () => {
           // callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}