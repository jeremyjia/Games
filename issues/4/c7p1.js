
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
  this.bll0=  "<div id = 'id_div_4__cmdClass' title = 'title: _cmdClass'> _cmdClass: v0.0.214</div>";
 

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

      d.v.b1 = blo0.blBtn( d.v,"id_4_Go", "Go",blColor[2]);
      d.v.b1.onclick = function(){ 
        var ta = bl$("id_4_ta_SendMsg");
        ta.value = "cc1:" + _o.board.pos.toFen() + ",-,-;";
      }
    }
    _on_off_div(b,d); 
    b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];

  }
  this.blline = "----";
  this.blrCmd2 = function(b,d){
    if(!d.v){
      d.v = blo0.blDiv(d,d.id+"v","test1",blGrey[5]);
      d.v.b1 = blo0.blBtn( d.v, "id_4_Get","Get",blColor[2]);
      d.vTimer = blo0.blDiv(d,d.id+"vTimer","vTimer",blGrey[3]);
      d.vTimer.v = blo0.blDiv(d.vTimer, "id_timerDbg","timerDbg",blGrey[5]);
      d.vTimer.fTimer = function(_u){
        if(!d.vTimer.n) d.vTimer.n = 0;
        d.vTimer.v.innerHTML = _u + ":" + d.vTimer.n++;
        if(_player==null) _player = _u;
        //d.v.b1.click();
      }
      var dChat = bl$("div_ID_4_I4C4");
      if(dChat) dChat.addTimerUser(d.vTimer);
      d.v.b1.onclick = function(){
        if(!this.n) this.n = 0;
        this.innerHTML = "get:" + this.n++; 
        
        var f = _fTest();
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