function CI21C2 (){
<<<<<<< HEAD
  var s = "i21c2_v0.31";
=======
  var s = "i21c2_v0.13";
>>>>>>> upstream/master
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
  const blo1 = new CBlClass();
  blo1.setPlayerURL("https://littleflute.github.io/english/NewConceptEnglish/Book2/2.mp3");

  const _fn2Test1 = function(_fv,_ot){
    _fv.innerHTML = "";  
    var tb = blo0.blDiv(_fv,_fv.id+"tb","tb",blGrey[0]);
    var v = blo0.blDiv(_fv,_fv.id+"v","v",blGrey[0]);
    var b1 = blo0.blBtn(tb,tb.id+"b1","currentTime","Gray");
    b1.onclick = function(){
      v.innerHTML = blo1.blGetCurTime();
    }
  }
  var btnPlay = blo0.blBtn(tb,tb.id+"btnPlay","play","white");btnPlay.b = false;
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
    btn.onclick = function(_btn,_n,_ta,_bs,_2v,_blo){
      return function(){ 
        _ta.value = _btn.txt;
        blo0.blMarkBtnInList(_btn,_bs,"yellow","grey");
        _bs.cur = _btn;
        _fn2Test1(_2v,_blo);
      }
    }(btn,n,ts[0],tb.bs,ui.v,blo1);
    tb.bs.push(btn);
  }
  btnPlay.onclick = function(_w){
    return function(){
      _w.innerHTML = Date();
      if(!this.b){
        this.b = true;
        this.innerHTML = "stop";
        blo1.toPlay();
      }
      else{
        this.b = false;
        this.innerHTML = "play";
        blo1.toStop();
      }
    }
  }(ui.v);
  _on_off_div(null,ui);
}
var oI21C2 = new CI21C2();
 
