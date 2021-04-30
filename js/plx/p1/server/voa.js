
var tagVOA = "voa"; 
var tagVersion = "_v0.43";

var tb = bl$("id_4_tb_server");
var v = bl$("id_4_v_server");

var w = {};
w._2do = function(txt){
    //v.innerHTML = txt;
}
var sURL = "https://learningenglish.voanews.com/z/986"; 
var sFN = "ac.voa";
blo0.blAjx(w,"http://localhost:8080/download?url="+sURL +"&filename=" + sFN);




o.getServerFiles(tb,v,tagVOA,fcbVOA); 

function fcbVOA(p1,p2){
    p1.inf.toDo = function(v1){
        var vta = blo0.blDiv(v1,v1.id+"vta", tagVOA + tagVersion ,"grey"); 
        vta.innerHTML = "";
        var tb = blo0.blDiv(vta,vta.id + "tb","tb",blGrey[0]);
        var v = blo0.blDiv(vta,vta.id + "v","v",blGrey[0]);
        tb.showMe = blo0.blBtn(tb,tb.id+"showMe","showMe",blGrey[1]);
        tb.showMe.style.float="right";
        v.txt = "";
        tb.showMe.onclick = function(){
                var w = {};
                w._2do = function(txt){       
                    v.txt = txt;
                    v.innerHTML = "";             
                    var ta = blo0.blTextarea(v,v.id+"ta","ta","lightgreen");
                    ta.style.width = 100 + "%";
                    ta.style.height = 100 + "px";
                    ta.value = txt;
                }
                blo0.blAjx(w,"http://localhost:8080/"+p2);
        }
        
        tb.parseMe = blo0.blBtn(tb,tb.id+"parseMe","parseMe",blGrey[1]);
        tb.parseMe.style.float="right";
        
        tb.parseMe.onclick = function(){
            v.innerHTML = "" + Date();     
            fParseType("ac",v.txt,v);
        }

    }
}

var fParseType =  function (_type,txt,_2v){
    var d = _2v;
    var a = txt.split('<span class="date date--mb date--size-3" >');
    var date1 = new Date();        
    d.innerHTML = date1.toLocaleTimeString();
    d.ls = [];
    d.loop = function(n){
      for(i in d.ls){
        if(n==d.ls[i].n){
          d.ls[i].style.backgroundColor = "brown"; 
        }
        else{
          if(!d.ls[i].oldBGC)
                    d.ls[i].style.backgroundColor = "black";
          else
                    d.ls[i].style.backgroundColor = d.ls[i].oldBGC;          
        }
      }
    }
    var newData = null;
    var n = 0;
    var bgColor = "greay";
    var bgcIdx = 0;
    for(i in a){
      if(i==0) continue;
      var d1 = a[i].split('</span>');
      if(newData!=d1[0]){
        newData=d1[0];
        bgColor = blPink[bgcIdx];
        bgcIdx++;
        n = 1;
      }
      else {
        n++;
      } 
      var a1 = a[i].split('href="');
      var a2 = a1[1].split('"');
      var a3 = a2[0].split('/'); 
      var fileName = d1[0] + "_"+_type+n;
      var b = blo0.blBtn(d,"b"+i, fileName +(a3.length==3?"*":""));
      
      b.style.backgroundColor = bgColor;
      b.oldBGC = bgColor;
      b.style.color = "white";

      b.onclick = function(_this,_i,_t,_d,_fileName){
        _this.n = _d.ls.length;
        return function(){           
          _d.loop(_this.n);
          var url = "https://learningenglish.voanews.com" + _t; 
          
          var fn = _fileName;
          fn = fn.replace(" ","-");
          fn = fn.replace(", ","-");  
          fn += ".html";
          var lastURL = "http://localhost:8080/download?url="+url +"&filename=" + fn;
          
            var w = {};
            w._2do = function(txt){ 
                fParsePage(lastURL,_this.parentElement,txt);
            } 
          blo0.blAjx(w,lastURL);
        }
      }(b,i,a2[0],d,fileName);
      d.ls.push(b);
    }     
  }
  
var fParsePage =  function (fileName,pv,pageTxt){    
    var pageV = blo0.blDiv(pv,pv.id+"pageV", "pageV" ,"lightblue"); 
    pageV.innerHTML = fileName;     
    var ta = blo0.blTextarea(pageV,pageV.id+"ta","ta","lightgreen");
    ta.style.width = 100 + "%";
    ta.style.height = 100 + "px";
    ta.value = pageTxt;
}