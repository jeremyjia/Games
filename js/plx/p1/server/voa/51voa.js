var tagHTML = "51voa";
var vHTML = "51voa: v0.41";

var tb = bl$("id_4_tb_server");
var v = bl$("id_4_v_server");
 
const o51voa = new C51VOA(tb,v);


function C51VOA(_tb,_v){ 
  var _ctx = {};
  this.v = vHTML + " <a href='http://www.baidu.com' target='_blank'>ref</a>";
  this.blrF1 = function(b,d){
    var w = {};
    w._2do = function(txt){ 
        var str = "var oReturn =" +  txt;  
        eval(str);
        oReturn.blrShowMe = function(b2,d2){  
            d2.innerHTML = oReturn.filename;
            var url = "http://localhost:8080/" + oReturn.filename;
            blo0.blShowHTMLFile(url,b2,d2);     
        }
        blo0.blShowObj2Div(d,oReturn);
    }
    var urlLrc = "http://localhost:8080/download?url=https://www.51voa.com/&filename=index_51voa.html"
    blo0.blAjx(w,urlLrc);

    b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
  } 
  this.blrF2 = function(b,d){
      d.innerHTML = b.id;
      fStep2(b,d,_ctx);
  } 
  this.blrStep3 = function(b,d){
      fStep3(b,d,_ctx);
  }

  var b = blo0.blBtn(_tb,_tb.id+"_4_51voa","xd51voa",blGrey[1]);
  b.style.float = "left";
  b.onclick =function(oC51VOA){
    return function(){
      _v.innerHTML = "51voa";
      blo0.blShowObj2Div(_v,oC51VOA);
    }
  }(this);

  
  var fStep2 = function(b,d,c){
    var md =blo0.blMD("md4fStep2","md4fStep2", 222 ,121, 333 ,555,blGrey[0]);
    md.v1 = blo0.blDiv(md,md.id+"v1","v1",blGrey[2]);
    var x = new CTest();
    blo0.blShowObj2Div(md.v1, x); 
    _on_off_div(this,md); 
    
    function CTest(){
        this.blrFun1 = function(b,d){
            var tb = blo0.blDiv(d,d.id+"tb","tb","grey");
            var v1= blo0.blDiv(d,d.id+"v1","v1","white");
            const x = document.getElementsByTagName("ul");
            var n = 0;
            for(i in x){
                n++;
                var btn = blo0.blBtn(tb,tb.id+"btn"+n,n,"grey");
                btn.onclick = function(_myBtn,_i,_n){
                return function(){ 
                    v1.innerHTML = _i.innerHTML;
                    c.o = _i.getElementsByTagName("li");                        
                }
                }(btn,x[i],n);
            }
        };
    }
  }
  
  var fStep3 = function(b,d,c){
    var md =blo0.blMD("md4fStep3","md4fStep3", 333 ,121, 333 ,555,blGrey[0]);
    var tb = blo0.blDiv(md,md.id+"tb","tb",blGrey[0]);
    var v1 = blo0.blDiv(md,md.id+"v1","v1",blGrey[2]);
    var n = 0;
    var ls = [];
    for(i in c.o){
        n++;
        var btn = blo0.blBtn(tb,tb.id+"btn"+n,n,"grey");  
        btn.onclick = function(_myBtn,_i,_n){
            return function(){
                fA4Step3(v1,_i);
                blo0.blMarkBtnInList(_myBtn,ls,"yellow","grey"); 
            }
        }(btn,c.o[i],n); 
        ls.push(btn);
    }        
    _on_off_div(this,md); 
  }
  var fA4Step3 = function(v,_i){
    v.innerHTML = "";
    var a = _i.getElementsByTagName("a"); 
    var l = _i.getElementsByClassName("lrc"); 
    var t = _i.getElementsByClassName("tran"); 
    var n = 1;
    var tb = blo0.blDiv(v,v.id+"tb","tb","gray");
    var v1 = blo0.blDiv(v,v.id+"v1","v1","gray");
    var btnLrc = null;
    if(l.length>0){
        btnLrc = blo0.blBtn(tb,tb.id+"btnLrc","lrc","purple"); n++;
        var a1 = l[0].href;
        var a2 = a1.split("/lrc/");

        btnLrc.lrcURL = "https://www.51voa.com//lrc/" + a2[1];
    }
    if(t.length>0){
        var btnTran = blo0.blBtn(tb,tb.id+"btnTran","btnTran","green"); n++;
    }
    if(btnLrc){
        var url = "http://localhost:8080/download?url=https://www.51voa.com/";
        var a1 = a[n].href;
        var a2 = a1.split("VOA_Special_English");
        url += "VOA_Special_English" + a2[1];
        url += "&filename=lrcPage.html";
        btnLrc.onclick = function(){
            fDownloadLrcPage(this,v1,url);
        }
    } 
    
    v1.innerHTML = a.length + ":" + l.length + ":" + t.length + ": n =" + n + " :lrcHREF=" +  a[n].href;        
  }
  var fDownloadLrcPage = function(b,d,url){
    var w = {};
    w._2do = function(txt){ 
        var str = "var oReturn =" +  txt;  
  eval(str);
        oReturn.originalURL = url;
        oReturn.blrShowLrcPage = function(b2,d2){ 
            var url = "http://localhost:8080/" + oReturn.filename;
            blo0.blShowHTMLFile(url,b2,d2);     
        }
        oReturn.blrLastStep = function(b3,d3){ 
            var bgColor = "235,149,111";
            var o = {};                
            o.v = "lastV0.11";
            o.blrSet = function(b,d){
                var tbBGColor = blo0.blDiv(d,d.id+"tbBGColor","BGColor","green");
                var b1 = blo0.blBtn(tbBGColor,tbBGColor.id+"b1","b1",blGrey[1]);
                b1.onclick = function(){
                    bgColor = "11,150,200";
                    this.style.backgroundColor = bgColor;
                }
                var b2 = blo0.blBtn(tbBGColor,tbBGColor.id+"b2","b2",blGrey[1]);
                b2.onclick = function(){
                    bgColor = "222,150,200";
                    this.style.backgroundColor = bgColor;
                }
                var b3 = blo0.blBtn(tbBGColor,tbBGColor.id+"b3","b3",blGrey[1]);
                b2.onclick = function(){
                    bgColor = "11,222,55";
                    this.style.backgroundColor = bgColor;
                }
            }
            o.lrcURL = b.lrcURL;
            var oMP3 = document.getElementById("mp3");
            o.mp3URL  = oMP3.href;
            var imgs = document.getElementsByTagName("img");
            o.imgURL = imgs[2].src;

            o.blrCreateMP4 = function(b4,d4){ _createMP4(b4,d4,o.lrcURL,o.mp3URL,o.imgURL);};
            o.blrCreateBLS = function(b5,d5){ _createBLS(b5,d5,o.lrcURL,o.mp3URL,o.imgURL,bgColor);};
            blo0.blShowObj2Div(d3,o);
        }
        blo0.blShowObj2Div(d,oReturn);
    } 
    blo0.blAjx(w,url);

    b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
  }

  var _createMP4 = function(b,d,_urlLrc,_urlMP3,_urlImg){
    
    var urlMP4 = "http://localhost:8080/image/combine?subtitlefile=";
    urlMP4 += _urlLrc;
    urlMP4 +=  "&audiofile=" +_urlMP3;
    urlMP4 += "&bgfile=" + _urlImg; 

    var w = {};
    w._2do = function(resTxt){
        d.innerHTML = resTxt;    
    }
    
    blo0.blAjx(w,urlMP4);
    b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
  }
  var _createBLS = function(b,d,ul,ua,ui,bgColor){
    var o1 = {};
    o1.urlMp3 = ua;
    o1.urlLrc = ul;
    o1.urlImg = ui;
    o1.blr2MakeMP4 = function(_o){ 
        var data = _makeBLS(ua,ul,ui,bgColor);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            //ta.value = this.responseText; 
        }	
        });
        xhr.open("POST", "http://localhost:8080/json?fileName=v_51voa.json");
        xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.send(data);

        return function(b,d){
            var dd = blo0.blDate();
            var url = 'http://localhost:8080/image/json2video?script=v_51voa.json&';
            url += 'video='+dd+'.mp4';
            var w = {};
            w._2do = function(txt){
                d.innerHTML = txt;
            }
            blo0.blAjx(w,url);
        }
    }(o1);


    blo0.blShowObj2Div(d,o1);
  }
  var _makeBLS = function(ua,ul,ui,bgColor){         
    var o= {
        "request": {
            "version": "0.0.21",
            "description":"LRC字幕超级对象",
            "width": 1920,
            "height": 1080,
            "music": "${VAR_MUSIC}",
            "rate": "1",
            "frames": [
                {
                    "number": "1",
                    "time": "${VAR_TIME}",
                    "objects": [
                        {
                            "text": "${VAR_TITLE}",
                            "x": 80,
                            "y": 180,
                            "size": 160,
                            "color": "255,32,240",
                            "layer": 2
                        }
                    ],
                    "backgroundColor": bgColor
                }
            ],
            "superObjects": [
                {
                    "type": "subtitle",
                    "frameRange": "(1,${VAR_TIME})",
                    "attribute": {
                        "script": "${VAR_LRC_PATH}",
                        "x1": 20,
                        "y1": 900,
                        "size": 55,
                        "color": "255,255,0",
                        "replace":[
                             {
                               "regex":"American",
                               "target":"美国"
                             },
                             {
                               "regex":"更多听力请访问51VOA.COM",
                               "target":"漂泊者乐园团队制作"
                             }
                        ]
                    },
                    "layer": 1
                },
                {
                    "type": "picture",
                    "attribute": {
                        "x1": 220,
                        "y1": 200,
                        "x2": 960,
                        "y2": 540,
                        "size": -1,
                        "color": "255,0,0",
                        "name": "${VAR_IMG_PATH}"
                    },
                    "frameRange": "(1,${VAR_TIME})",
                    "action": {
                        "trace": "y=0*x*x+0*x+200",
                        "step": 0
                    }
                },
                {
                    "type": "javascript",
                    "frameRange": "(1,1250)",
                    "attribute": {
                        "script": "firework.js",
                        "function": "animateFrame",
                        "start": 1
                    },
                    "layer": 1
                }
            ],
            "Macros": [
                {
                    "name": "VAR_TITLE",
                    "value": "英语慢速听力"
                },
                {
                    "name": "VAR_MUSIC",
                    "value": ua
                },
                {
                    "name": "VAR_LRC_PATH",
                    "value": ul
                },
                {
                    "name": "VAR_IMG_PATH",
                    "value": ui
                }
            ]
        }
    }
    var r = JSON.stringify(o);
    return r;
  }
}

