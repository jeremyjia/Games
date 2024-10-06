const tagMp3Lrc2Bls = "mp3lrc2bls/index.js bv0.11";  
const fs = require('fs');
const l = require('../../logger'); 
l.tag1(tagMp3Lrc2Bls,"-----------tagMp3Lrc2Bls------------------")

var e = {};
module.exports = e;
 
e.newBls = function(req,res){
    res.status(200); 
    
    let r = {};
    r.tag = tagMp3Lrc2Bls;
    r.time = Date();
    const filePath = './public/v1.json';
    const content = "test content.";
    fs.writeFile(filePath,content,'utf8', (err) => {
        if(err){
            r.err = err;
            res.json(r);
        }
        else{
            r.filePath = filePath;
            res.json(r);
        }
    })
}