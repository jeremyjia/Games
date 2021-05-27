var voaV = "v0.52";

var bbbb = true;
var nCDrawVOA = 0;
function CDrawVOA(_o,_parent){
    var _c = "green";

    if(nCDrawVOA>0) return;

    var b = true;  
    this.onOff = function(){
      bbbb = !bbbb;
    } 
    this.getB = function(){
      return bbbb;
    } 
    this.draw = function(ctx){
      if(bbbb){
        _o.rect(ctx,50,150,50,50,_c);   
        _o.text(ctx,voaV + ":" + _parent.getN() ,50,150);
        _parent.draw(_o,ctx);
      }
    }  
    this.mousedown = function(x,y){   
      _c = "red";
    }
    this.mouseup = function(x,y){   
      _c = "green";
    }

    _o.reg2draw(this);
    _o.regMousedown(this);
    _o.regMouseup(this);
    _o.regMousemove(this);
    nCDrawVOA++;
}

function CUtilVOA(){ 
  var curP = "curText";
  var l = [];
  var n = 0;
  var drw = null;
  this.reg2o = function(_o){    
    drw = new CDrawVOA(_o,this); 
  } 
  
  this.setCurP = function(_txt){
    curP = _txt;
  } 
  this.onOff = function(){
    bbbb = !bbbb;
    //if(drw) drw.onOff();
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
  this.draw = function(o,ctx){
    o.text(ctx,"_parent: " + Date(),50,180); 
    
    o.text(ctx,curP,50,222);  

    for(i in l){
      o.rect(ctx,50 + i*55,350,50,50,"blue");   
    }
  }
}
const voaUtil = new CUtilVOA();




voaUtil.parsePage = function(ta,txt,fileName){
    var pv = ta.parentElement;
    var v = blo0.blDiv(pv,pv.id+"v","v","grey"); 
    v.innerHTML = "xxxxx " + Date();
    ta.value = txt;
    var a = txt.split('<span class="text">Pop-out player</span>');
    for(i in a){
        var d = blo0.blDiv(v,v.id+"v"+i,"v"+i,blGrey[i]); 
        d.onclick = function(_this,_i,_a){
            return function(){
                    f(_this,_i,_a[_i],fileName);//_this.innerHTML = _a[_i];
            }
        }(d,i,a);
    }
}

var f = function(d,i,txt,fileName){
  if(0==i) f0(d,txt,fileName);
  if(1==i) f1(d,txt);
}

var f0 = function(d,txt,fileName){
  var a = txt.split('<a class="c-mmp__fallback-link" href="');
  var b = a[1].split('">');
  var c = b[0];
  d.innerHTML = c;
  blo0.blPlayer(d,"f0Test",c,100,100,400,300,"lightgreen");
  d.v = blo0.blDiv(d,"vvvvvv",c,"red"); 
  var b1 = blo0.blBtn(d.v,d.v.id+"b1","b1","grey");
  b1.onclick = function(){
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
