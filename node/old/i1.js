
const http = require('http');
var url = require('url');
var fs = require('fs');

const api4i1 = require('./api/api4i1');


const server = http.createServer((req, res) => {
    const tag = "[server-i1.js v0.145] ";
	
	var xdURL = req.url;
	console.log(tag + xdURL);
	var a = xdURL.split("?");
	var b = a[1];
	console.log(a[0]);
	var c = a[0].split("/");

	if(c[1] === 'api'){
		api4i1.api4i1(a[0],req,res);		
	}
    else if(c[1] === 'show'){
		//res.writeHead(404, {'Content-Type': 'text/html'});        
        res.write(tag + "/show : " + Date() );
        res.write(`            
                <form action="/api" method="post">
                    <input type="text" name="fname" /><br />
                    <input type="number" name="age" /><br />
                    <input type="file" name="photo" /><br />
                    <button>Save</button>
                </form> 
        `);                  
        return res.end();    
    }
    else if(c[1] === 'insert'){        
        res.write(tag + "/insert : " + Date() );
                    
        return res.end();    
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
});
server.listen(3000);

