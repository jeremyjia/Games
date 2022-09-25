const tag_abc2db = "abc2db/index.js bv0.13";  
const { spawn } = require("child_process"); 
const l = require('../../logger'); 
l.tag1(tag_abc2db,"--tag_abc2db---------------------------")
 

var e = {};
module.exports = e;

e.abc2db = function(req,res){ 
    _save2file(req,res,"t1");
}

function _save2file(req,res,abcFileName){
    var fs = require('fs');
    var data = req.body.content;
    fs.writeFile('app\\abc2db\\' + abcFileName + ".abc", data, function (err) 
    {
        if (err){
            __res(req,res,err);
            throw err;
        } 
        __res(req,res,abcFileName);
        console.log('Saved!');
    });
}
function __res(req,res,p1){
    _c3(req,res);

    res.status(200);
    console.log(req.body);
    
    var r = {};
    r.api = "abc2db"; 
    r.p1 = p1;
    r.date = Date();
    r.tag = tag_abc2db; 
    r.url =  req.url; 
    r.reqBody = req.body;

    res.json(r); 

} 
function _c2(req,res){
    const ls = spawn("dir ", [" "]);

    ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });

    ls.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });

} 
function _c3(req,res){
    
    const { exec } = require("child_process");

    exec("python app\\abc2db\\e.py", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

} 