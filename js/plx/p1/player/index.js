var tag_playerBoard = "index.js_v0.32";
var tb = bl$("id_p1_tb"); 

tb.btnPlayerBoard = blo0.blBtn(tb,"id_btnPlayerBoard","btnPlayerBoard",blGrey[2]);
tb.btnPlayerBoard.style.float = "left";

tb.btnPlayerBoard.onclick = function(){ 
    if(!this.p)  this.p = new CPlayer();
    this.p.show(this); 
}
function CPlayer(){  
    var _dPlayer = null;
    var _tb = null;
    this.show = function(b){
        if(!_dPlayer){  
            var src = "https://littleflute.github.io/blcd2/cd1/Babyface%20%20%20If.mp3";
            _dPlayer = blo0.blPlayer("id_4_div_video_player","title4Player",src,100,100,400,300,"lightgreen");
            _tb = blo0.blDiv(_dPlayer,_dPlayer.id+"_tb","_tb",blGrey[0]);
            _tb.ls = [];
        }
        _on_off_div(b,_dPlayer);
        b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];  
    }
    this.setSrc = function(url){
        if(_dPlayer) _dPlayer.p.src = url;
    }
    this.getCurrentTime = function(){
        return _dPlayer.p.currentTime;
    }
    this.setCurrentTime = function(t){
        _dPlayer.p.currentTime = t;
    }
    this.addBtn = function(cbFun){
        var n = _tb.ls.length;
        var btn = blo0.blBtn(_tb,_tb.id+"btn"+n,"b"+n,blGrey[1]);
        btn.onclick = function(_thisBtn,_thisList,_thisClickFun){
            return function(){
                if(_thisClickFun) _thisClickFun(_thisBtn);                
            }
        }(btn,_tb.ls,cbFun);
        _tb.ls.push(btn);
    }
    this.setTxts = function(ps){        
        var vt = blo0.blDiv(_dPlayer,_dPlayer.id+"_vt","_vt",blGrey[0]);
        var vtb = blo0.blDiv(vt,vt.id+"tb","tb",blGrey[0]);
        var vtv = blo0.blDiv(vt,vt.id+"v","v",blGrey[0]);
        vtb.ls = [];
        for (i in ps){
            var n = vtb.ls.length;
            var btn = blo0.blBtn(vtb,vtb.id+"btn"+n,n,blGrey[1]);
            btn.onclick = function(_thisTxtBtn,_thisBtnList,_i,_ps){
                return function(){
                    vtv.innerHTML = "";
                    blo0.blMarkBtnInList(_thisTxtBtn,_thisBtnList,"yellow","grey");
                    _thisTxtBtn.txt = _ps[_i];
                    
                    if(!_thisTxtBtn.curTime) _thisTxtBtn.curTime = _dPlayer.p.currentTime;
                    else _dPlayer.p.currentTime = _thisTxtBtn.curTime;

                    var tb = blo0.blDiv(vtv,vtv.id+"tb","tb",blGrey[0]);

                    var v = blo0.blDiv(vtv,vtv.id+"v","v",blGrey[1]);
                    var ta = blo0.blTextarea(v, "id_4_ta_voaTXT","ta","lightgreen");
                    ta.style.width = 100 + "%";
                    ta.style.height = 100 + "px";
                    ta.value = _thisTxtBtn.txt;

                    tb.b1 = blo0.blBtn(tb,tb.id+"b1","b1",blGrey[3]);
                    tb.b2 = blo0.blBtn(tb,tb.id+"b2","-1",blGrey[3]);
                    tb.b3 = blo0.blBtn(tb,tb.id+"b3","+1",blGrey[3]);
                    tb.b1.onclick = function(){
                        ta.value = this.id;
                    }
                    tb.b2.onclick = function(){
                        _thisTxtBtn.curTime -= 1;
                    }
                    tb.b3.onclick = function(){
                        _thisTxtBtn.curTime += 1;
                    }
                }
            }(btn,vtb.ls,i,ps);
            vtb.ls.push(btn);
        }

    }
}