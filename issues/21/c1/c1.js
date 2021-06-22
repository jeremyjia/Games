var version = "i21c1_v0. 121";
var s = version;
s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/21/c1/c1.js'"
s += " style='color:blue;'";		s +=">"; s += " c1.js* ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/21/c1/c1.js'"
s += " style='color:green;'";		s +=">"; s += " c1.js ";
s += "<a target='_blank' href='";

var a = blo0.blURL();
var b = a.split("Games");
s += b[0];

s += "/Games/issues/21/c1/index.html'";
s += " style='color:brown;'";		s +=">"; s += " index.html";

var d = blo0.blMD("div_ID_4_I21_C1", s ,555,100,500,400, "lightgreen"); 

d.v = blo0.blDiv(d,d.id+"v","v",blGrey[0]);
var ui = {};
ui.blrSaveJSON = function(b,d){
  if(!d.bRun){
      var tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]);
      var v = blo0.blDiv(d,d.id+"v","v",blGrey[3]);
      var testScript = blo0.blBtn(tb,tb.id+"testScript ","testScript ",blGrey[1]);
      testScript .onclick = function(){
        var url = "http://localhost:8080/json?fileName=a1.json";
        var pl = {};
        pl.v = "v0.11";
        pl.n = 1;
        pl.date = Date();
        blo0.blPOST(url,pl,function(txt){
          v.innerHTML = txt;
        });
      }
      var makeScript = blo0.blBtn(tb,tb.id+"makeScript ","makeScript ",blGrey[1]);
      makeScript .onclick = function(){
        var url = "http://localhost:8080/json?fileName=a1.json";
        var pl =  blo0.blMakeScript();
        blo0.blPOST(url,pl,function(txt){
          v.innerHTML = txt;
        });
      }
      var a1_json= blo0.blBtn(tb,tb.id+"a1_json","a1_json",blGrey[1]);
      a1_json.onclick = function(){
        var url = "http://localhost:8080/a1.json"; 
        this._2do = function(txt){       
          v.innerHTML = Date();
          v.tb = blo0.blDiv(v,v.id+"tb","tb",blGrey[0]);
          v.v1 = blo0.blDiv(v,v.id+"v1","v1",blGrey[2]);
          var s = "var bls="+txt; eval(s);

          var btnShowAllInf = blo0.blBtn(v.tb,v.tb.id+"btnSHowAllInf","btnShowAllInf",blGrey[1]);
          btnShowAllInf.onclick = function(){
            blo0.blShowObj2Div(v.v1,bls.request);
          }
          var btnShowAllFrames = blo0.blBtn(v.tb,v.tb.id+"btnShowAllFrames","btnShowAllFrames",blGrey[1]);
          btnShowAllFrames.onclick = function(){
            v.v1.innerHTML = "";
            var ftb = blo0.blDiv(v.v1,v.v1.id+"vftb","ftb",blGrey[2]);
            var fv = blo0.blDiv(v.v1,v.v1.id+"fv","fv",blGrey[3]);
            var fs = bls.request.frames;   
            var _ls = [];         
            for(i in fs){
              var btnFrame = blo0.blBtn(ftb,ftb.id+i,i,blGrey[4]);
              btnFrame.onclick = function(_fs,_i,_btnFrame){
                return function(){ 
                  blo0.blMarkBtnInList(_btnFrame,_ls,"yellow","grey");
                  fv.innerHTML = "";
                  var curFTb = blo0.blDiv(fv,fv.id+"curFTb","curFTb",blGrey[2]);
                  var curFv = blo0.blDiv(fv,fv.id+"curFv","curFv",blGrey[3]);
                  var btnCurFInf = blo0.blBtn(curFTb,curFTb.id+"btnCurFInf","btnCurFInf",blGrey[1]);
                  btnCurFInf.onclick = function(_curF){
                    return function(){
                      blo0.blShowObj2Div(curFv,_curF);
                    }
                  }(_fs[_i]); 
                  var btnCurFObjs = blo0.blBtn(curFTb,curFTb.id+"btnCurFObjs","btnCurFObjs",blGrey[1]);
                  btnCurFObjs.onclick = function(_curF){
                    return function(){
                      curFv.innerHTML = "";
                      var otb = blo0.blDiv(curFv,curFv.id+"otb","otb",blGrey[2]);
                      var ov = blo0.blDiv(curFv,curFv.id+"ov","ov",blGrey[3]);
                      var os = _curF.objects;
                      for(i in os){
                        var btnCurObj = blo0.blBtn(otb,otb.id+i,i,blGrey[1]);
                        btnCurObj.onclick = function(_os,_i){
                          return function(){
                            blo0.blShowObj2Div(ov,_os[_i]);
                          }
                        }(os,i);
                      }
                    }
                  }(_fs[_i]); 
                }
              }(fs,i,btnFrame);
              _ls.push(btnFrame);
            } 
          }

          var btnMakeMP4 = blo0.blBtn(v.tb,v.tb.id+"btnMakeMP4","btnMakeMP4",blGrey[1]);
          btnMakeMP4.onclick = function(){ 
            var a = bls.request.music;
             
            var b = a.split("/"); 
            var c = b[b.length-1];
            var d = c.replace("mp3","mp4"); 
            var url = "http://localhost:8080/image/json2video?script=a1.json&video="+d; 
            this._2do = function(txt){v.v1.innerHTML = txt};
            blo0.blAjx(this,url); 
            v.v1.innerHTML = d;
          }

        };
        blo0.blAjx(this,url);
      }
      var showPlainBls= blo0.blBtn(tb,tb.id+"showPlainBls","showPlainBls",blGrey[1]);
      showPlainBls.onclick = function(){
        var url = "http://localhost:8080/a1.json"; 
        this._2do = function(txt){       
          v.innerHTML = txt;
        };
        blo0.blAjx(this,url);
      }
      var makeMp4= blo0.blBtn(tb,tb.id+"makeMp4","makeMp4",blGrey[1]);
      makeMp4.onclick = function(){
        var url = "http://localhost:8080/image/json2video?script=a1.json&video=a1.mp4"; 
        this._2do = function(txt){v.innerHTML = txt};
        blo0.blAjx(this,url);
      }
  }
  _on_off_div(b,d);  
  b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
}; 
ui.bll = "-";
ui.blrShowScript = function(b,d){
  if(!d.bShow){
    d.bShow = true;
    d.innerHTML = Date();
    var tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]);
    var v = blo0.blDiv(d,d.id+"v","v",blGrey[3]);
    var b1 = blo0.blBtn(tb,tb.id+"b1","b1",blGrey[1]);
    b1.onclick = function(){
      blo0.blShowScript(v);
    }
  }
  _on_off_div(b,d);
  b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
};

blo0.blShowObj2Div(d.v,ui);
bl$("blrSaveJSON").click();
bl$("blrShowScript").click();
   
_on_off_div(null,d);