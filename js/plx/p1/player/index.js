var tag_playerBoard = "index.js_v0.52";
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
    this.getBtnList = function(){
        return _dPlayer.btnTxtList;
    }
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
        var vtb = blo0.blDiv(vt,vt.id+"vtb","vtb",blGrey[0]);
        var vtv = blo0.blDiv(vt,vt.id+"v","v",blGrey[0]);
         

        vtb.ls = [];
        _dPlayer.btnTxtList = vtb.ls;
        for (i in ps){
            var n = vtb.ls.length;
            if(i==0) continue;
            var a = ps[i];
            var b = a.split('<em>');
            if(b.length>1) break;

            var btn = blo0.blBtn(vtb,vtb.id+"btn"+n,n,blGrey[1]); 
            btn.reflash = function(v){
                v.innerHTML = this.curTime;
            }
            btn.onclick = function(_thisTxtBtn,_thisBtnList,_i,_ps){
                return function(){
                    vtv.innerHTML = "";
                    blo0.blMarkBtnInList(_thisTxtBtn,_thisBtnList,"yellow","grey");
                    var a = _ps[_i];
                    var b = a.split('</p>');
                    _thisTxtBtn.txt = b[0];
                    
                    if(!_thisTxtBtn.curTime) {
                        _thisTxtBtn.curTime = _dPlayer.p.currentTime; 
                    }
                    else{
                        _dPlayer.p.currentTime = _thisTxtBtn.curTime; 
                    }

                    var tb = blo0.blDiv(vtv,vtv.id+"tb","tb","lightblue");

                    var v = blo0.blDiv(vtv,vtv.id+"v","v",blGrey[1]);
                    var ta = blo0.blTextarea(v, "id_4_ta_voaTXT","ta","lightgreen");
                    ta.style.width = 100 + "%";
                    ta.style.height = 100 + "px";
                    ta.value = _thisTxtBtn.txt;

                    tb.btnCur = blo0.blBtn(tb,tb.id+"cur","cur",blGrey[3]);
                    tb.btnMinus1 = blo0.blBtn(tb,tb.id+"btnMinus1","-1",blGrey[3]);
                    tb.btnAdd1 = blo0.blBtn(tb,tb.id+"btnAdd1","+1",blGrey[3]);
                    tb.btnMinus10 = blo0.blBtn(tb,tb.id+"btnMinus10","-10",blGrey[3]);
                    tb.btnAdd10 = blo0.blBtn(tb,tb.id+"btnAdd10","+10",blGrey[3]);
                    tb.btnNow = blo0.blBtn(tb,tb.id+"now","now",blGrey[3]);
                    tb.btnMakeBLS = blo0.blBtn(tb,tb.id+"btnMakeBLS","btnMakeBLS",blGrey[3]);
                    tb.btnMakeBLS.onclick = function(){
                        var _src = blo0.getPlayerSrc();
                        var fs = function(fls){
                            return function(){
                                var l = [];
                                for(i in fls){
                                    var os = function(txtBtn){
                                        return function(){
                                            var ol = [];
                                            var o = blo0.blMakeTextObj(txtBtn.txt,10,333,30,"blue");
                                            ol.push(o);
                                            return ol;

                                        }
                                    }(fls[i]);
                                    var f = blo0.blMakeFrame(i,1,os(),"red");
                                    l.push(f);
                                }
                                return l;
                            }
                        }(_thisBtnList);
                        var sos = [];
                        var ms = [];
                        var s = blo0.blMakeScript1("v0.11",1920,1080,_src,"1",fs(),sos,ms);
                        ta.value = JSON.stringify(s);
                    }
                    tb.btnCur.onclick = function(){
                        _thisTxtBtn.curTime = _dPlayer.p.currentTime;
                        _thisTxtBtn.reflash(tb.btnNow);
                    } 
                    tb.btnMinus1.onclick = function(){
                        _thisTxtBtn.curTime -= 1;
                        _thisTxtBtn.reflash(tb.btnNow);
                    }
                    tb.btnAdd1.onclick = function(){
                        _thisTxtBtn.curTime += 1;
                        _thisTxtBtn.reflash(tb.btnNow);
                    }
                    tb.btnMinus10.onclick = function(){
                        _thisTxtBtn.curTime -= 10;
                        _thisTxtBtn.reflash(tb.btnNow);
                    }
                    tb.btnAdd10.onclick = function(){
                        _thisTxtBtn.curTime += 10;
                        _thisTxtBtn.reflash(tb.btnNow);
                    }
                    _thisTxtBtn.reflash(tb.btnNow);
                }
            }(btn,vtb.ls,i,ps);
            vtb.ls.push(btn);
        }

    }
}