
const http = require('http');
var url = require('url');
var fs = require('fs');

const api4i1 = require('./api/api4i1');


const server = http.createServer((req, res) => {
    const tag = "[server-i2.js v0.145] ";
	
	var xdURL = req.url;
	console.log(tag + xdURL);
	var a = xdURL.split("?");
	var b = a[1];
	console.log(a[0]);
	var c = a[0].split("/");

	if(c[1] === 'api'){
		api4i1.api4i1(a[0],req,res);		
	}
    else if(c[1] === 'files'){  
		var afiles = require('./utils/getAllFiles.js');

        res.write(tag + "/files : " + afiles.allFiles() );                    
        return res.end();    
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
		  	test();

			res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(tag + "404 : test() " + filename + " " + Date());
            res.write("<br> Try: <a href='index.html'>index.html</a>");
            res.write("<br> Try: <a href='test.png' target='_blank'>test.png</a>");
            res.write("<br> Try: <a href='files' target='_blank'>[files]</a>");
                
			return res.end();
		  }
		  var a = filename.split(".");
		  var b = a[a.length-1];
		  console.log("filename=" + b); 
		  if(b==="png") res.writeHead(200, {'Content-Type': 'image/png'});
		  else		  res.writeHead(200, {'Content-Type': 'text/html'});

		  //res.writeHead(200, {'Content-Type': 'image/jpeg'});

		  //res.writeHead(200, {'Content-Type': 'audio/mp3'});
		  res.write(data);
		  return res.end();
		});
	}
});
server.listen(3000);

//npm install canvas
function test(){
	const fs = require('fs')
	const { createCanvas, loadImage } = require('canvas')

	const width = 1200
	const height = 630

	const canvas = createCanvas(width, height)
	const context = canvas.getContext('2d')

	context.fillStyle = '#000'
	context.fillRect(0, 0, width, height)

	context.font = 'bold 70pt Menlo'
	context.textAlign = 'center'
	context.textBaseline = 'top'
	context.fillStyle = '#3574d4'

	const text = 'Hello, World! by xd'

	const textWidth = context.measureText(text).width
	context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 120, 120)
	context.fillStyle = '#1ff'
	context.fillText(text, 300, 170)

	context.fillStyle = '#ff1'
	context.font = 'bold 30pt Menlo'
	context.fillText('flaviocopes.com', 600, 530)

	loadImage('./1.png').then(image => {
	  context.drawImage(image, 0, 0, 800, 1210)
	  const buffer = canvas.toBuffer('image/png')
	  fs.writeFileSync('./test.png', buffer)
	})
}