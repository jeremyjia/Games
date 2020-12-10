//api4i1.js
const { parse } = require('querystring');

exports.api4i1 = function (sAPI,req,res) {
	var tag = "[api4i1:v0.0.55] \n";
//	res.write(tag); 
	var sr = sAPI + " " + Date();
//	res.write(sr); 

    console.log(tag + sr + " req.method=" + req.method);
	
	
    if (req.method === 'POST') {
        console.log(tag + "Post->:");
        collectRequestData(req, result => {
            console.log(result);
			res.write("xdtest:\n"); 
            var ss = JSON.stringify(result);
            res.write(ss);    
            res.end(`\n Parsed data belonging to ${result.fname}`);
        });
    } 
    else {
        console.log(tag + "else->:");
        res.end(`
            <!doctype html>
            <html>
            <body>
                <form action="/api" method="post">
                    <input type="text" name="fname" /><br />
                    <input type="number" name="age" /><br />
                    <input type="file" name="photo" /><br />
                    <button>Save</button>
                </form>
            </body>
            </html>
        `);
    }
}

function collectRequestData(request, callback) {
    const _FORM_URLENCODED = 'application/x-www-form-urlencoded';
    const _JSON = 'application/json';
    console.log(request.headers);
    if(request.headers['content-type'] === _FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            console.log("_FORM_URLENCODED:: chunk = " + chunk);
            body += chunk.toString();
        });
        request.on('end', () => {
			console.log("_FORM_URLENCODED:: end.");
            callback(parse(body));
        });
    }
    else if(request.headers['content-type'] === _JSON){
        let body = '';
        request.on('data', chunk => {
            console.log("chunk=" + chunk); 
            body += chunk.toString();
        });
        request.on('end', () => {
            console.log("_JSON:: end.");
            callback(parse(body));
        });
    }
    else {
		console.log("callback null .");
        callback(null);
    }
}