const tag = "[nodelib/l1.js_v0.0.123] ";

var url = require('url');
var formidable = require('formidable');
var fs = require('fs');
const { runInNewContext } = require('vm');
const { SIGUSR1 } = require('constants');
var n = 0;
var o = {};
o.resource = [
      "video2.json",
      "video1.json",
      "package-lock.json",
      "video.json",
      "v2.json",
      "v1.json"
    ];
var oMp4 = {};
    oMp4.resource = [
          "1.mp4",
          "2.mp4"
        ];
    
var oJPG = {};
oJPG.resource = [
      "1.jpg",
      "2.jpg",
      "3.jpg"
    ];

    
var oMp3 = {};
oMp3.resource = [
      "1.mp3",
      "2.mp3"
    ];

var myJSON = JSON.stringify(o);
var myMP3 = JSON.stringify(oMp3);
var myMP4 = JSON.stringify(oMp4);    
var myJPG = JSON.stringify(oJPG);
console.log(tag );

exports.f1 = function(req,res){
  console.log(tag + req.url);

  var a = req.url.split('?');
  console.log(tag + n + ":" + a.length  + " " + a[0] + " a[1]= " + a[1]);

  var r1 = a[0];
  if (r1 == '/getResourceOnServer') {
    n++;
    var b = a[1].split("=");
    if(b[1]=="mp3"){
      res.write(myMP3);
    }
    else if(b[1]=="mp4"){
      res.write(myMP4);
    }
    else if(b[1]=="jpg"){
      res.write(myJPG);
    }
    else{
      res.write(myJSON);
    }    
    res.end();
  }  
  else if (r1 == '/command'){  
    n++;
    var b = a[1].split("=");

   // res.write(tag + "***************** command: " + b[0] + ":"+ b[1]);
   var s =b[1].split("%20");
   var sCmd = "";
   for(i in s){
      sCmd+=" " + s[i];
   }

    const { exec } = require("child_process"); 
    function f1(r){ 
      res.write(r); 
      res.end();
    }
    exec(sCmd, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);    
            f1(error.message);             
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            f1(stderr);                 
            return;
        }
        console.log(`stdout: ${stdout}`);
        f1(stdout); 
    });
 
  }
  else if (r1 == '/json'){  
    console.log(tag + n + ":" + a.length  + " " + a[1]  + ": body=" + req.body);  
    var s = "var o=";
    req.on('data', chunk => {
      console.log(`Data chunk available: ${chunk}`);
      s+=chunk;
    });
    req.on('end', () => {
      //end of data
      console.log(s);  
      res.write(s);
      res.end();    
    })
  }
  else if (r1 == '/fileupload') {
    var form = new formidable.IncomingForm();
    console.log(form);
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = __dirname + '/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) 
        {
          console.log(err);
          throw err;
        }
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  }
  else if (r1 == '/1.html'
    || req.url == '/2.html'
    || req.url == '/3.html'
    || req.url == '/nodelib/CPlay.js'
    || req.url == '/plxScriptEditor.js'
    || req.url == '/plx1.js'
    || req.url == '/plx11.js'
    || req.url == '/plx12.js'
    || req.url == '/plx/mng.js'
    || req.url == '/plx/p1.js'
    || req.url == '/plx/p2.js'
    || req.url == '/v1.json'
    || req.url == '/v2.json' 
  ) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      } 
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }  
  else if ( r1 == '/1.mp3'
        || r1 == '/2.mp3'  
  ) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      } 
      res.writeHead(200, {'Content-Type': 'audio/mp3'});
      res.write(data);
      return res.end();
    });
  } 
  else if ( r1 == '/1.jpg'
        || r1 == '/2.jpg'  
        || r1 == '/3.jpg'  
  ) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      } 
      res.writeHead(200, {'Content-Type': 'image/jpg'});
      res.write(data);
      return res.end();
    });
  } 
  else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<a href="1.html">1.html</a> ');
    res.write('<a href="2.html">2.html</a> ');
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}