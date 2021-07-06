function CI21C2 (){
  var s = "i21c2_v0.11";
  s += "<a target='_blank' href='https://github.com/jeremyjia/Games/edit/master/issues/21/c2/c2.js'"
  s += " style='color:blue;'";		s +=">"; s += " c2.js* ";
  s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/21/c2/c2.js'"
  s += " style='color:green;'";		s +=">"; s += " c2.js ";
  s += "<a target='_blank' href='https://jeremyjia.github.io/Games/issues/21/c2/index.html'"
  s += " style='color:brown;'";		s +=">"; s += " index.html";
  var ui = blo0.blMD("div_ID_4_I21_C2", s ,    666,100,500,400, "lightgreen"); 
  var tb = blo0.blDiv(ui,ui.id+"tb","tb",blGrey[0]);
  ui.v = blo0.blDiv(ui,ui.id+"v","v",blGrey[1]);
  tb.bs = [];
  var btnSnap = blo0.blBtn(tb,tb.id+"btnSnap","+","brown");
  var btnCur = blo0.blBtn(tb,tb.id+"btnCur","now","green");
  btnCur.onclick = function(){
    var ts = document.getElementsByTagName('textarea');
    tb.bs.cur.txt = ts[0].value;
  }
  btnSnap.onclick = function(){
    var n = tb.bs.length;
    
    var ts = document.getElementsByTagName('textarea');
    var btn = blo0.blBtn(tb,tb.id+n,n,blGrey[2]); 
    btn.txt = ts[0].value;
    btn.onclick = function(_btn,_n,_ta,_bs){
      return function(){ 
        _ta.value = _btn.txt;
        blo0.blMarkBtnInList(_btn,_bs,"yellow","grey");
        _bs.cur = _btn;
      }
    }(btn,n,ts[0],tb.bs);
    tb.bs.push(btn);
  }
  _on_off_div(null,this.ui);
}
var oI21C2 = new CI21C2();
 
