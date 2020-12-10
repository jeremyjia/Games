tag = "[old/index.js_v0.0.111]";
var http = require('http');
var url = require('url');
var fs = require('fs');

exports.fOld = function(req,res,next){
	console.log(tag+req.url); 
	var q = url.parse(req.url, true);
	var filename = "old" + q.pathname;
	console.log("filename = "+filename);

	if(filename=="old/run"){
		const run = require('./api/run.js');
		run.go(res);
	}
	else if(filename=="old/runSQL"){
		
		res.write("old/runSQL: ...");
		return res.end();
	}
	else{	
		fs.readFile(filename, function(err, data) {
			if (err) {
			  res.writeHead(404, {'Content-Type': 'text/html'});
			  res.write(tag + "404 Not Found: " +filename);
			  res.write("<br> Try: <a href='/old/index.html'>old/index.html</a>");
			  res.write("<br> Try: <a href='/old/run'>old/run</a>");
			  return res.end();
			} 
			var b = filename.split('.');
			
			if(b[1]=="png"){
				res.writeHead(200, {'Content-Type': 'image/png'});
			}			
			else{
				res.writeHead(200, {'Content-Type': 'text/html'});
			}
			res.write(data);
			return res.end();
		});
	}
}