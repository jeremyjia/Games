const tag_midi2abc = "midi2abc/index.js bv0.14";  
const { spawn } = require("child_process"); 
const l = require('../../logger'); 

var formidable = require('formidable');
var fs = require('fs');

l.tag1(tag_midi2abc,"--tag_midi2abc---------------------------")
 

var e = {};
module.exports = e;

e.midi2abc = function(req,res){ 
    _saveMidiFile(req,res);
}
 
function _saveMidiFile(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.midifile.filepath;
        var newpath = 'C:/FFOutput/' + files.midifile.originalFilename;  
        fs.rename(oldpath, newpath, function (err) {
            if (err) {            
                __res(req,res,0,"error: " + JSON.stringify(err));
            }
            __res(req,res,1,"midi file uploaded: " + newpath)
        }); 
    });
}
function __res(req,res,status,p1){ 
    res.status(200);
    console.log(req.body);
    
    var r = {}; 
    r.result = status;
    r.abc = p1;
    r.p1 = p1;
    r.date = Date();
    r.tag = tag_midi2abc; 
    r.url =  req.url; 
    r.reqBody = req.body;

    res.json(r); 

}   