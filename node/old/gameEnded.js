const { parse } = require('querystring');
var mysql = require('mysql');

exports.runSQL = function (req,res, A, B) {
    if (req.method === 'POST') {
        console.log("Post->:");
        collectRequestData(req, result => {
            console.log(result);
            res.write("xdtest:\n"); 
            var ss = JSON.stringify(result);
            var p1 = result.end_time;
            var p2 = result.winner;
            var p3 = result.A;
            var p4 = result.B;
            var _sql1 = "update Group6Game set end_time='"+p1+ "', winner = '"+p2+ "' where competitor_1 = '"+p3+ "' and competitor_2 = '"+p4+ "'";
            var _sql2 = 
            inserttodb(res, _sql);

        });
    }
    else {
        res.end(`
            <!doctype html>
            <html>
            <body>
                <form action="/gameEnded" method="post">
                    <input type="text" name="competitor_1" /><br />
                    <input type="text" name="competitor_2" /><br />
                    <input type="text" name="winner" /><br />
                    <input type="text" name="start_time" /><br />
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

function inserttodb(res,s) {  
    
    var _sql = s;
    
        var con = mysql.createConnection({
        host: "localhost",
        user: "jack",
        password: "123456",
        database: "group6db"
        });
        
        con.connect(function(err) {      
        if (err) throw err;       
        con.query(_sql, function (err, result, fields) {
            if (err)   {
                console.log(err);  
                console.log(err.sqlMessage);  
                res.write(err.sqlMessage); 
                res.end();
            //   throw err;
            } 
            else{
                console.log(result);  
                var r = JSON.stringify(result);
                console.log("xdtest:" + r);
                res.write("successful" + new Date() ); 
                res.write(r);  
                res.end();
    
            }
            
        }); 
        });  
    };