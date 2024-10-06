const tagMp3Lrc2Bls = "mp3lrc2bls/index.js bv0.22";  
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
    const content = u.makeBls(1920,1040,115,"1",
        "https://files.21voa.com/audio/202410/spanish-scientist-uses-bacteria-to-repair-18th-century-artworks.mp3",
        [
            {
                "number": "1",
                "time": "115",
                "objects": [
                    {
                        "text": "newBls.frame[0].text " + r.time,
                        "x": 80,
                        "y": 320,
                        "size": 60,
                        "color": "160,32,240",
                        "layer": 2
                    }
                ],
                "backgroundColor": "255,149,55"
            }
        ],
        [
            {
                "type": "subtitle",
                "frameRange": "(1,115)",
                "attribute": {
                    "script": "https://www.21voa.com/static/lrc/spanish-scientist-uses-bacteria-to-repair-18th-century-artworks.lrc",
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