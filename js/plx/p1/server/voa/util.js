var voaV = "v0.225";

var bbbb = true;
var nObjDrawVOA = 0;


const voaUtil = new CUtilVOA();

var CBtn = function(oBoss,id,dx,dy,dw,dh,fBtnCB){

  var _id = id; var _dx = dx; var _dy = dy; var _dw = dw; var _dh = dh; 
  var x0 = 0; var y0 = 0;
  var _myColor = "blue";
  this.drawBtn = function(oDraw,ctx,x,y){
    x0 = x;
    y0 = y;
    oDraw.rect(ctx,x0 + _dx,y0 + _dy,_dw,_dh,_myColor);   
    oDraw.text(ctx,id, x0 + _dx,y0 + _dy + 15);
    //oDraw.text(ctx,"["+x0+","+y0+"]", x0 + _dx,y0 + _dy + 33);
    if(oBoss.drawInBtn) oBoss.drawInBtn(oDraw,ctx,x0 + _dx, y0 + _dy);
  }
  this.btnMousedown = function(x,y){ 
    if(blo0.blPiR(x,y,x0 + _dx,y0 + _dy,_dw,_dh)){  
      _myColor = "red";
      if(_id=="id_btn_2_save_blVOA"){ 
        _save_blVOA(oBoss.blMakeVOAScript(),"blVOA.json",oBoss);
      }
      if(_id=="id_btn_2_parseType"){ 
        oBoss.blParseType();
      }
      if(fBtnCB) fBtnCB();
    }         
    else{
      _myColor = "grey";
    }
  }
  this.setColor = function(c){
    _myColor = c;
  }
}

function CDrawVOA(_o,_parent){ 
    var _x = 50;
    var _y = 150;
    var _w = 50, _h = 50;
    var _c = "green";
    var _bDown = false;
    var _ls = [];

    _ls.push(new CBtn(_parent,"id_btn_2_save_blVOA",50, 55, 30,30));
    _ls.push(new CBtn(_parent,"id_btn_2_parseType",150, 55, 30,30));
    _ls.push(new CBtn(_parent,3,250, 55, 30,30));
     
    _ls.draw = function(oDraw,ctx,x,y){
       
      oDraw.rect(ctx,x+60,y,100,30,"grey");   
      for(i in _ls){
        _ls[i].drawBtn(oDraw,ctx,x,y);
      }
    }
    _ls.lsMousedown = function(x,y){      
      for(i in _ls){
        _ls[i].btnMousedown(x,y);
      }
    } 

    if(nObjDrawVOA>0) return;
 
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
        _parent.drawUtil(_o,ctx,_x,_y);
        _ls.draw(_o,ctx,_x,_y);
      }
    }  
    this.mousedown = function(x,y){   
      if(_o.inRect(x,y,_x,_y,_w,_h)){
        _bDown = true;
        _c = "red";     
      } 
       
      _parent.clickTest(x,y);
      _ls.lsMousedown(x,y);     
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
    nObjDrawVOA++;
}

function CUtilVOA(){ 
  var _save_bl_VOA_Res = "bl_voa_res>>>";
  var curClick = "curClick";
  var curDuration = 345;
  var curTypeFN = "";
  var txtParseType = "";
  var originalMp3URL = "originMp3URL=";
  var _ps = [];
  var curP = "curText";
  var l = [];
  var n = 0;
  var _op = {
    v: "op-0.12",
    n: 0,
    parse_Page: function(txt){
      this.n = txt.length;
      blo0.txtPage = txt;

      var a = txt.split('<a class="c-mmp__fallback-link" href="');
      var b = a[1].split('">');
      originalMp3URL = b[0]; 
      blo0.setPlayerURL(originalMp3URL); 

    },
    draw: function(_o,_ctx,_x,_y){
      _o.rect(_ctx,_x,_y,100,20,"yellow");   
      _o.text(_ctx,this.v,_x,_y-20);    
      _o.text(_ctx,this.n,_x,_y-5);    
    },
  }; 

  var drw = null;

  
  var f2do = function(d,i,txt,fileName){
    if(0==i) f0(d,txt,fileName);
    if(1==i) f1(d,txt);
  }

  var f0 = function(d,txt,fileName){
    var a = txt.split('<a class="c-mmp__fallback-link" href="');
    var b = a[1].split('">');
    originalMp3URL = b[0];
    d.innerHTML = originalMp3URL;
    blo0.setPlayerURL(originalMp3URL); 

    blo0.blPlayer(d,"f0Test",originalMp3URL,100,100,400,300,"lightgreen");
    d.v = blo0.blDiv(d,"vvvvvv",originalMp3URL,"red"); 
    var btnDownloadMp3 = blo0.blBtn(d.v,d.v.id+"btnDownloadMp3","btnDownloadMp3","grey");
    btnDownloadMp3.onclick = function(){
      var w = {};
      w._2do = function(txt){
        //v.innerHTML = txt;
      }
      
      var a = fileName.split('.');
      var sFN = a[0] + ".mp3"; 
      blo0.blAjx(w,"http://localhost:8080/download?url="+originalMp3URL +"&filename=" + sFN);
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
      voaUtil.setCurPs(b,"P",50,30,10);

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
    curTypeFN =  tyleFileName;
    drw = new CDrawVOA(_o,this); 
  } 
  this.clickTest = function(x,y){
    curClick = "clickTest:" +x +","+ y;
    for(i in _ps){      
      _ps[i].btnMousedown(x,y);
    }
  }
   
  this.drawInBtn = function(_oDraw,_ctx,_x,_y){
    _oDraw.rect(_ctx,_x,_y,10,10,"red");
  }

  this.blParseType = function(){ 
    var w = {};
    var that = this;
    w._2do = function(txt){         
      var ls = [];
      var a = txt.split('<span class="date date--mb date--size-3" >');
      var newData = null;
      var n = 0;
      for(i in a){
        if(i==0) continue;
        var d1 = a[i].split('</span>');
        if(newData!=d1[0]){
          newData=d1[0];
          n = 1;
        }
        else {
          n++;
        } 
        
        var a1 = a[i].split('href="');
        var a2 = a1[1].split('"');

        var t = curTypeFN.split('.');
        var fileName = d1[0] + "_"+t[0]+n; 
        var o = {};
        o.url = a2[0];
        o.fileName = fileName;
        ls.push(o);
      }

      that.setCurPs(ls,t[0],133,50,4,function(_MyType){
        return function(n,ls){
           curP = _MyType + ":" + n + " - https://learningenglish.voanews.com"+ ls[n].url+": setCurPs_in_parseType";

           var url = "https://learningenglish.voanews.com" + ls[n].url; 
          
          var fn = ls[n].fileName;
          fn = fn.replace(" ","-");
          fn = fn.replace(", ","-");  
          fn += "." + _MyType;
          var lastURL = "http://localhost:8080/download?url="+url +"&filename=" + fn;
          
          var w = {};
          w._2do = function(txt){ 
            curP = blo0.blTime(0) + ": " + txt;

            var w1 = {};
            w1._2do = function(txtPage){        
              _op.parse_Page(txtPage);
            }
            blo0.blAjx(w1,"http://localhost:8080/"+fn);
          } 
          blo0.blAjx(w,lastURL);

        }
      }(t[0]));          
    }
    blo0.blAjx(w,"http://localhost:8080/"+curTypeFN);
  }

  this.blMakeVOAScript = function(){
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
  
  this.setCurPs = function(ls,_typeFN,_w,_h,_nCol,fCB){
    _ps = [];
    var x = 11;
    var y = 55;
    var w = _w?_w:50;
    var h = _h?_h:30;
    for(i in ls){
      if(i%_nCol==0){
        x = 11;
        y += h + 2;
      }
      x += w + 2; 
      var btn = new CBtn(this,ls[i] + "-" + i,x, y, 30,30,function(_i,_ls){
        return function(){
          if(fCB) fCB(_i,_ls);
        }
      }(i,ls));
      _ps.push(btn);
    }
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
  this.getResponseText = function(txt){
    _save_bl_VOA_Res = txt;
  }
  this.drawUtil = function(o,ctx,x,y){
    o.text(ctx,_save_bl_VOA_Res,x,y - 44);
    o.text(ctx,curDuration,x,y - 22);
    o.text(ctx,curTypeFN,x,y - 11);
    o.text(ctx,"_parent: " + Date(),x,y+30);     
    o.text(ctx,curClick,x,y+122);     
    o.text(ctx,curP,x,y+50);  
    o.text(ctx,originalMp3URL,x,y + 111);
    _op.draw(o,ctx,x+100,y-30);
     

    for(i in l){
      o.rect(ctx,50 + i*55,350,50,50,"blue");   
    }
    
    for(i in _ps){      
      _ps[i].drawBtn(o,ctx,x,y);
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
                    f2do(_this,_i,_a[_i],fileName);
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
 
