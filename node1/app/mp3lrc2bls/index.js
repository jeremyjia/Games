const tagMp3Lrc2Bls = "mp3lrc2bls/index.js bv0.34";  
const fs = require('fs');
const l = require('../../logger'); 
l.tag1(tagMp3Lrc2Bls,"-----------tagMp3Lrc2Bls------------------")

var e = {};
module.exports = e;
 
e.newBls = function(req,res){
    let q = req.query; 
    res.status(200); 
    
    const mp3URL = q.mp3; 
    const lrcURL = q.lrc; 

    let r = {};
    r.tag = tagMp3Lrc2Bls;
    r.description = "...";
    r.time = Date();
    r.mp3 = q.mp3;
    r.lrc = q.lrc;
    r.bls = q.bls;
    const filePath = './public/'+q.bls+'.json';
    const content = u.makeBls(1920,1040,115,"1",
        mp3URL,
        [
            {
                "number": "1",
                "time": "481",
                "objects": [
                    {
                        "text": "newBls.frame[0].text " + r.time,
                        "x": 80,
                        "y": 320,
                        "size": 60,
                        "color": "55,11,123",
                        "layer": 2
                    }
                ],
                "backgroundColor": "111,11,111"
            }
        ],
        [
            {
                "type": "subtitle",
                "frameRange": "(1,311)",
                "attribute": {
                    "script": lrcURL,
                    "x1": 20,
                    "y1": 670,
                    "size": 30,
                    "color": "255,255,0",
                    "replace":[
                        {
                        "regex":"American",
                        "target":"美国"
                        },
                        {
                        "regex":"更多听力请访问21VOA.COM",
                        "target":"漂泊者乐园团队制作"
                        }
                    ]
                },
                "layer": 1
            }
    ]);
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

const u = function(){
    let o = {};
    o.makeBls = function(w,h,time,rate,srcAudio,lsFrame,lsSuperObjects){
        let r = {};  
		r.version 		= "v0.11";
		r.width 		= w;
		r.height 		= h;
		r.time          = time;
		r.music 		= srcAudio;
		r.rate 			= rate;
		r.frames 		= lsFrame;		
		r.superObjects 	= lsSuperObjects;
        let s = {};
		s.request 		= r;
        return JSON.stringify(s);
    }
    
    return o;
}();