const tag_abc2db = "abc2db/index.js bv0.11";  
 
const l = require('../../logger'); 
l.tag1(tag_abc2db,"--tag_abc2db---------------------------")
 

var e = {};
module.exports = e;

e.abc2db = function(req,res){ 
    _abc2db(req,res);
}

function _abc2db(req,res){
    res.status(200);
    console.log(req.body);
    
    var r = {};
    r.api = "abc2db"; 
    r.date = Date();
    r.tag = tag_abc2db; 
    r.url =  req.url; 
    r.reqBody = req.body;
    res.json(r); 

}