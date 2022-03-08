var tag_playerBoard = "index.js_v0.31";
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
}