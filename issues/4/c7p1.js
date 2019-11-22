
var d = bl$("id_div_4_c7p1");
var d4b = bl$("id_4_board");
blo0.blShowObj2Div(d, new _cmdClass(d4b));
if(bl$("blrCmd1")){bl$("blrCmd1").click();} 
if(bl$("blrCmd2")){bl$("blrCmd2").click();} 
if(bl$("id_4_Set")){bl$("id_4_Set").click();} 
if(bl$("id_4_Set")){bl$("id_4_Set").click();} 

function _cmdClass(_o){   
  var _pSet   = 0;	     
  var _rState = 0;
  var _player = null;
  var _v2      = null;

  var _fTest =  function(){
          var ta = bl$("id_4_ta_showMsg");
          var a = ta.value;
          var b = a.split("cc1:");
          var c = b[b.length-1]; 
          var d = c.split(";");
          var e = d[0];       
          var f = e.split(",");
          return f;
      }

  _o.board.xdFun1 = function(p){
            var r = _rState;
            return r;
  };
  _o.board.xdFun2 = function(p){
        var ta = bl$("id_4_ta_SendMsg");
        var s= "cc1:" + _o.board.pos.toFen();
        s += ",";
        s += _v2.btnW.innerHTML;
        s += ",";
        s += _v2.btnB.innerHTML;
        s += ";";
        ta.value = s;
        var btn = bl$("id_4_btnSend"); btn.click();
  };
  this.bll0=  "<div id = 'id_div_4__cmdClass' title = 'title: _cmdClass'> _cmdClass: v0.0.255</div>";
 

  this.blrCmd1 = function(b,d){
    if(!d.v){
      d.v = blo0.blDiv(d,d.id+"v","test1",blGrey[5]);
      d.vSet = blo0.blDiv(d,d.id+"vSet","vSet",blGrey[5]);
      var dRed = blo0.blDiv(d.vSet, d.vSet + "dRed","::","grey");
      var P = ["帅","仕","相","马","车","炮","兵"];
      var bs = [];
      for(var i=8;i<=14;i++){
      	var bp = blo0.blBtn(dRed,dRed.id+i, P[i-8],"#f4bec7");
      	bp.onclick = function(_i){
      		return function(){
      			for(j in bs){
      				bs[j].style.background = j>6?"#adebad":"#f4bec7";
      			}
      			this.style.background = "#99b3ff";
      			_pSet = _i;
      		}
      	}(i);
      	bs.push(bp);
      } 

      var dBlack = blo0.blDiv(d.vSet, d.vSet + "dBlack","::","grey");
      var P = ["将","士","象","马","车","炮","卒"];
      for(var i=16;i<=22;i++){
      	var bp = blo0.blBtn(dBlack,dBlack.id+i, P[i-16],"#adebad");
      	bp.onclick = function(_i){
      		return function(){ 
      			for(j in bs){
      				bs[j].style.background = j>6?"#adebad":"#f4bec7";
      			}
      			this.style.background = "#99b3ff";
      			_pSet = _i;
      		}
      	}(i);
      	bs.push(bp);
      } 
 
      d.v.bSet = blo0.blBtn( d.v,"id_4_Set", "Set",blGrey[0]);
      d.v.bSet.onclick = function(){  //*
        if(_o.board.xdSet) {
        	_o.board.xdSet = false; 
        }
        else{
        	_o.board.xdSet = true; 
        	_o.board.SetFun = function(p){
        		_o.board.pos.squares[p] = _pSet;
        		_o.board.flushBoard();
        	};
        }  
        //*/
        _on_off_div(this,d.vSet);
    	this.style.background = this.style.background=="red"?blGrey[5]:blColor[4];
      }
      d.v.bEmpty = blo0.blBtn( d.vSet,"id_4_Empty", "Empty",blGrey[2]);
      d.v.bEmpty.onclick = function(){ 
      	var fen = "9/9/9/9/9/9/9/9/9/9 w - - 0 1";
        _o.board.pos.fromFen(fen);
        _o.board.flushBoard();
      }
      d.v.bNew = blo0.blBtn( d.vSet,"id_4_New", "New",blColor[4]);
      d.v.bNew.onclick = function(){ 
      	var fen = "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1";
        _o.board.pos.fromFen(fen);
        _o.board.flushBoard();
      }
      d.v.btnSend = blo0.blBtn( d.vSet,"id_4_Send", "Send",blColor[6]);
      d.v.btnSend.onclick = function(){  
        _o.board.xdFun2();
      }
    }
    _on_off_div(b,d); 
    b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];

  }
  this.blline = "----";
  this.blrCmd2 = function(b,d){
    if(!d.v){
      d.v = blo0.blDiv(d,d.id+"v","test1",blGrey[5]); 
      d.vTimer = blo0.blDiv(d,d.id+"vTimer","vTimer",blGrey[3]);       
      _v2 =  blo0.blDiv(d.vTimer,d.vTimer.id+"v2","v2",blGrey[3]);

     //*  
      _v2.btnW = blo0.blBtn(_v2, _v2.id + "btnW","btnW","#f4bec7");
      _v2.btnB = blo0.blBtn(_v2, _v2.id + "btnB","btnB","lightgreen");
      //*/
      d.vTimer.v = blo0.blDiv(d.vTimer, "id_timerDbg","timerDbg",blGrey[5]);
      d.vTimer.fTimer = function(_u){
        if(!d.vTimer.n) d.vTimer.n = 0;
        var fen1 = _o.board.pos.toFen();

        d.vTimer.v.innerHTML = _u + ":" + d.vTimer.n++ + ":" + fen1;
        if(_player==null) _player = _u;
        var f = _fTest();
        var newFEN = f[0];
        if(fen1!=newFEN){
            d.v.myGet();
        }
      }
      var dChat = bl$("div_ID_4_I4C4");
      if(dChat) dChat.addTimerUser(d.vTimer);
      d.v.myGet = function(){
        if(!this.n) this.n = 0;
        this.innerHTML = "get:" + this.n++; 

        var f = _fTest();
        _BoardState(_v2,_v2.btnW,_v2.btnB,f[0],f[1],f[2]);

        var a = f[0].split(" ");
        var b = a[1];
        
        if(f[1]==_player && b=="w") _rState = 1;
        else if(f[2]==_player && b=="b") _rState = 1;
        else _rState = 0;
        _o.board.pos.fromFen(f[0]);
        _o.board.flushBoard();
      }

    }
    _on_off_div(b,d); 
    b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
  }
}
function _BoardState(v,btnW,btnB,fen,w,b){ 
  btnW.innerHTML = w;
  btnB.innerHTML = b;
  if(w=="-"){
    btnW.style.background = "grey";    
  }
  else{
  }
  if(b=="-"){
    btnB.style.background = "grey";    
  }
  else{
  }
  
  //*
  var i = fen.split(" ");
  var j = i[1]; 
  if(j=="w") v.style.background = "#f4bec7";
  else if(j=="b") v.style.background = "lightgreen";
  else v.style.background = "grey";
  //*/
}