const tag_midi2abc = "midi2abc/index.js bv0.13";  
const { spawn } = require("child_process"); 
const l = require('../../logger'); 
l.tag1(tag_midi2abc,"--tag_midi2abc---------------------------")
 

var e = {};
module.exports = e;

e.midi2abc = function(req,res){ 
    __res(req,res,"test:midi2abc");
}
 
function __res(req,res,p1){ 
    res.status(200);
    console.log(req.body);
    
    var r = {}; 
    r.p1 = p1;
    r.date = Date();
    r.tag = tag_midi2abc; 
    r.url =  req.url; 
    r.reqBody = req.body;

    res.json(r); 

}   