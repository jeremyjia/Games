var tag_playerBoard = "index.js_v0.21";
var tb = bl$("id_p1_tb"); 

tb.btnPlayerBoard = blo0.blBtn(tb,"id_btnPlayerBoard","btnPlayerBoard",blGrey[2]);
tb.btnPlayerBoard.style.float = "left";

tb.btnPlayerBoard.onclick = function(){ 
    if(!this.o)  this.o = new CPlayer();
    this.o.show(this); 
}
function CPlayer(){ 
    this.show = function(b){
        if(!b.v){
            b.v = blo0.blMD("xdTest","xdTest",10,10,100,100,"brown");
            //blo0.blPlayer(d,"f0Test",originalMp3URL,100,100,400,300,"lightgreen");
        }
        _on_off_div(b,b.v);
        b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];  
    }
}