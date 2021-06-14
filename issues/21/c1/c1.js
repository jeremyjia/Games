var version = "i21c1_v0. 23";
var s = version;
s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/21/c1/c1.js'"
s += " style='color:blue;'";		s +=">"; s += " c1.js* ";
s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/21/c1/c1.js'"
s += " style='color:green;'";		s +=">"; s += " c1.js ";
s += "<a target='_blank' href='";
var a = blo0.blURL();
var b = a.split("Games");
s += b[0];
s += "/Games/issues/21/c1/index.html'"
s += " style='color:brown;'";		s +=">"; s += " index.html";

var d = blo0.blMD("div_ID_4_I21_C1", s ,555,100,500,400, "lightgreen"); 

d.v = blo0.blDiv(d,d.id+"v","v",blGrey[0]);
var ui = {};
ui.blrSaveJSON = function(b,d){
  if(!d.bRun){
      var tb = blo0.blDiv(d,d.id+"tb","tb",blGrey[0]);
      var v = blo0.blDiv(d,d.id+"v","v",blGrey[1]);
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
        this._2do = function(txt){v.innerHTML = txt};
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
}; 

blo0.blShowObj2Div(d.v,ui);
   
_on_off_div(null,d);