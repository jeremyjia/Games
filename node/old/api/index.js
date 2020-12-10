 const tag = "[old/api/index.js_v0.11]"
 var mysql = require('mysql');

 var h = "localhost"; var u = "root"; var pw = "group6db"; var db = "g6DB";  
//var h = "dev-userdatabase-instance-1.coawyv4mqnwk.us-west-2.rds.amazonaws.com"; var u = "admin"; var pw = "group6dev"; var db = "g6DB";

console.log(tag);

exports.run = function (sAPI,req,res) {
  var sr = sAPI + " \n [v0.42]========== api run: " + new Date();
  writeLog2MySQL(sAPI);  
  if (req.method === 'POST') {
          collectRequestData(req, result => {
              console.log(result);
            //  res.end(`Parsed data belonging to ${result.fname}`);
          });
      } 

	console.log(sr);
  res.write(sr);   
};
exports.get = function (req,res) {
  var sr = "success";
  console.log("result");
    collectRequestData(req, result => {
        console.log(result);
      //  res.end(`Parsed data belonging to ${result.fname}`);
    }); 

  console.log(sr);
  res.write(sr);  
};

function writeLog2MySQL(sAPI) {
  var sql = "INSERT INTO api_log (logID, logText ) VALUES (";
    sql += 1; 
    sql += ","
    sql +="'";
    sql += sAPI + " : " + new Date();
    sql += "')";

  console.log(sql);

   var con = mysql.createConnection({
      host: h,
      user: u,
      password: pw,
      database: db
    });
     
    con.connect(function(err) {      
      if (err) throw err;       
      con.query(sql, function (err, result, fields) {
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
          }
         
      }); 
    });  
}

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/json';//'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
            
        let body = '';
        request.on('data', chunk => {
          console.log("chunk=" + chunk); 
          body += chunk.toString();
          var s = "post " + ":" + new Date();
          writeLog2MySQL(s);
        });
        request.on('end', () => {
           // callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}