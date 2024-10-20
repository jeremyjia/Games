const tag_bls2v= "bls2v/index.js bv0.22";    
const l = require('../../logger.js'); 
const c = require('../../util/canvas.js');  
l.tag1(tag_bls2v,"--tag_bls2v---------------------------")
 

var e = {};
module.exports = e;

e.createV = function(req,res){ 
    res.status(200);
    console.log(req.body);

    var r = {}; 
    r.time = Date();
    r.toDo = "call ffmpeg to create video from bls.";  
    r.test = c.toDraw();

    res.json(r); 
} 