const tagImage = "image/index.js bv0.11";  
const l = require('../../logger'); 
l.tag1(tagImage,"-----------tagImage------------------")

var e = {};
module.exports = e;

e.download = function(req,res){
    var r = {};
    r.api = "image download"; 
    r.date = Date();
    r.tag = tagImage; 
    r.url =  req.url; 
    r.query = req.query;
    r.return = downloadImage(r.query.url,r.query.fn);
    res.json(r); 
}

const download = require('image-downloader');

function downloadImage(url, filepath) {
    return download.image({
       url,
       dest: filepath 
    });
}