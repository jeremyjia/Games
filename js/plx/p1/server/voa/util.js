var voaV = "v0.152";

var bbbb = true;
var nCDrawVOA = 0;
const voaUtil = new CUtilVOA();

function CDrawVOA(_o,_parent){
    var _getResonseText = "_getResonseText";
    var _x = 50;
    var _y = 150;
    var _w = 50, _h = 50;
    var _c = "green";
    var _bDown = false;
    var _ls = [];
    var CBtn = function(id,dx,dy,dw,dh){
      var _id = id; var _dx = dx; var _dy = dy; var _dw = dw; var _dh = dh; 
      var _myColor = "lightgreen";
      this.draw = function(oDraw,ctx,x,y){
        oDraw.rect(ctx,x + _dx,y + _dy,_dw,_dh,_myColor);   
        oDraw.text(ctx,"[" + _x + "," + _y + "]", x + _dx,y + _dy + 15);
      }
      this.mousedown = function(x,y){ 
        if(_o.inRect(x,y,_x + _dx,_y + _dy,_dw,_dh)){  
          _myColor = "red";
          if(_id==1){ 
            _save_blVOA(_parent.blVOA(),"blVOA.json",_ls);
          }
        }         
        else{
          _myColor = "grey";
        }
      }
      this.setColor = function(c){
        _myColor = c;
      }
    }

    _ls.push(new CBtn(1,50, 55, 30,30));
    _ls.push(new CBtn(2,150, 55, 30,30));
    _ls.push(new CBtn(3,250, 55, 30,30));
    
    _ls.getResponseText = function(txt){
      _getResonseText = txt + " : " + Date();
    }
    _ls.draw = function(oDraw,ctx,x,y){
      
      oDraw.text(ctx,_getResonseText,x+222,y);   
      oDraw.rect(ctx,x+60,y,100,30,"grey");   
      for(i in _ls){
        _ls[i].draw(oDraw,ctx,x,y);
      }
    }
    _ls.mousedown = function(x,y){      
      for(i in _ls){
        _ls[i].mousedown(x,y);
      }
    } 

    if(nCDrawVOA>0) return;
 
    this.onOff = function(){
      bbbb = !bbbb;
    } 
    this.getB = function(){
      return bbbb;
    } 
    this.draw = function(ctx){
      if(bbbb){
        _o.rect(ctx,_x,_y,_w,_h,_c);   
        _o.text(ctx,voaV + ":" + _parent.getN() + "[" + _x + "," + _y + "]",_x,_y);
        _parent.draw(_o,ctx,_x,_y);
        _ls.draw(_o,ctx,_x,_y);
      }
    }  
    this.mousedown = function(x,y){   
      if(_o.inRect(x,y,_x,_y,_w,_h)){
        _bDown = true;
        _c = "red";     
      } 
      
      _ls.mousedown(x,y);
    }
    this.mouseup = function(x,y){   
      _bDown = false;
      _c = "green";
    }
    this.mousemove = function(x,y){   
      if(_bDown){
        _x = x;
        _y = y;
      }
    }


    _o.reg2draw(this);
    _o.regMousedown(this);
    _o.regMouseup(this);
    _o.regMousemove(this);
    nCDrawVOA++;
}

function CUtilVOA(){ 
  var curDuration = 345;
  var curType = "curType";
  var originalMp3URL = "originMp3URL=";
  var curP = "curText";
  var l = [];
  var n = 0;
  var drw = null;

  
  var f = function(d,i,txt,fileName){
    if(0==i) f0(d,txt,fileName);
    if(1==i) f1(d,txt);
  }

  var f0 = function(d,txt,fileName){
    var a = txt.split('<a class="c-mmp__fallback-link" href="');
    var b = a[1].split('">');
    originalMp3URL = b[0];
    d.innerHTML = originalMp3URL;
    blo0.setPlayerURL(originalMp3URL); 

    blo0.blPlayer(d,"f0Test",c,100,100,400,300,"lightgreen");
    d.v = blo0.blDiv(d,"vvvvvv",c,"red"); 
    var btnDownloadMp3 = blo0.blBtn(d.v,d.v.id+"btnDownloadMp3","btnDownloadMp3","grey");
    btnDownloadMp3.onclick = function(){
      var w = {};
      w._2do = function(txt){
        //v.innerHTML = txt;
      }
      var sURL = c; 
      var a = fileName.split('.');
      var sFN = a[0] + ".mp3"; 
      blo0.blAjx(w,"http://localhost:8080/download?url="+sURL +"&filename=" + sFN);
    }
  }

  var f1 = function(d,txt){
    d.tb = blo0.blDiv(d,d.id+"tb","tb","grey");  
    var mainTxtV = blo0.blDiv(d,d.id+"mainTxtV","mainTxtV","grey");  
    d.v = blo0.blDiv(d,d.id+"v","v","lightblue");  
    d.v.innerHTML = txt;
    var btnOnOff = blo0.blBtn(d.tb,d.tb.id+"btnOnOff","btnOnOff",blGrey[0]);
    btnOnOff.onclick = function(){
      voaUtil.onOff();
    }
    var b1 = blo0.blBtn(d.tb,d.tb.id+"b1","b1","grey");
    b1.onclick = function(){
      voaUtil.add(b1);
    }
    var b2 = blo0.blBtn(d.tb,d.tb.id+"b2","b2","grey");
    b2.onclick = function(){
      voaUtil.clear();
    }
    var btnTxt2TA = blo0.blBtn(d.tb,d.tb.id+"btnTxt2TA","btnTxt2TA",blGrey[1]);
    btnTxt2TA.onclick = function(){
      var ta = bl$("id_ta_Page_Txt");
      ta.value = txt;
    }
    
    var btnGetMaintxt = blo0.blBtn(d.tb,d.tb.id+"btnGetMaintxt","btnGetMaintxt",blGrey[1]);
    btnGetMaintxt.onclick = function(){
      mainTxtV.innerHTML = "mainTxt" + Date();
      var mainTxtToolBar = blo0.blDiv(mainTxtV,mainTxtV.id+"mainTxtToolBar","mainTxtToolBar",blGrey[2]);   
      var btn4xd = blo0.blBtn(mainTxtToolBar,mainTxtToolBar.id+"xd","xd",blGrey[3]);  
      var ps = [];
      //*
      var a = txt.split('<div id="comments" class="comments-parent">'); 
      var b = a[0].split('<p>');
      for(i in b){
        var btn4P = blo0.blBtn(mainTxtToolBar,mainTxtToolBar.id+i,i,blGrey[3]); 
        btn4P.onclick = function(_this,_i,_b){
          return function(){                
            _this.n = _i;
            for(j in ps){
              ps[j].style.backgroundColor	  = "grey";            
              if(j==_this.n) ps[j].style.backgroundColor	  = "yellow";            
            }

            var ta = bl$("id_ta_Page_Txt");
            ta.value = _b[_i]; 
            voaUtil.setCurP(_b[_i]);

          }
        }(btn4P,i,b);
        ps.push(btn4P);
      }
      //*/
    }
  }

  this.reg2o = function(_o,tyleFileName){    
    curType = "[curType] " + tyleFileName;
    drw = new CDrawVOA(_o,this); 
  } 
  this.blVOA = function(){
    var d = {};
    var r = {};
    
    curDuration = Math.floor(blo0.getDuration());
    
    
    var fs =  [
      {
          "number": "1", 
          "time": curDuration, 
          "objects": [  
              {
                  "graphic": "rect", 
                  "attribute": {
                      "left": 500, 
                      "top": 400, 
                      "width": 100, 
                      "height": 150, 
                      "color": "142,28,124"
                  }
              }
          ], 
          "backgroundColor": "1,100,222"
      }
    ];
    r.version = "v0.14";
    r.width = 1024;
    r.height = 760;
    r.music = originalMp3URL;
    r.rate = "1";
    r.frames = fs;
    
    d.request = r;
    return d;
  }
  this.setCurP = function(_txt){
    curP = _txt;
  } 
  
  this.getCurP = function(_txt){
    return curP;
  } 
  this.onOff = function(){
    bbbb = !bbbb; 
  } 
  this.getN = function(){
    n++;
    return  " : " + n;
  } 
  this.add = function(item){
    l.push(item);
  } 
  this.clear = function(){
    l = [];
  } 
  this.draw = function(o,ctx,x,y){
    o.text(ctx,curDuration,x,y - 22);
    o.text(ctx,curType,x,y - 11);
    o.text(ctx,"_parent: " + Date(),x,y+30);     
    o.text(ctx,curP,x,y+50);  
    o.text(ctx,originalMp3URL,x,y + 111);

    for(i in l){
      o.rect(ctx,50 + i*55,350,50,50,"blue");   
    }
  }
  this.parsePage = function(ta,txt,fileName){
    var pv = ta.parentElement;
    var v = blo0.blDiv(pv,pv.id+"v","v","grey"); 
    v.innerHTML = "xxxxx " + Date();
    ta.value = txt;
    var a = txt.split('<span class="text">Pop-out player</span>');
    for(i in a){
        var d = blo0.blDiv(v,v.id+"v"+i,"v"+i,blGrey[i]); 
        d.onclick = function(_this,_i,_a){
            return function(){
                    f(_this,_i,_a[_i],fileName);
            }
        }(d,i,a);
    }
}
}


var _save_blVOA = function(jsonData2Save,jsonFN,objRecieve){  
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    objRecieve.getResponseText( this.responseText );
  }	
  });
  xhr.open("POST", "http://localhost:8080/json?fileName=" + jsonFN);
  xhr.setRequestHeader("Content-Type", "text/plain");

  xhr.send(JSON.stringify(jsonData2Save));
}
 
