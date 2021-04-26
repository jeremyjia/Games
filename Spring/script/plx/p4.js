 
const tag = "[plx/p4.js_v0.13]";
const b = bl$("plx_p4_btn"); 
 
b.v = blo0.blMDiv(b.parentElement,tag,tag,234,88,155,55,blGrey[0]); 
b.v.tb = blo0.blDiv(b.v,b.v.id+"tb","tb",blGrey[0]);
 

b.v.tb.b1 = blo0.blBtn(b.v.tb,b.v.tb.id+"b1","mp3",blGrey[2]);
b.v.tb.b1.onclick = function(){
    alert(this.id);
}  


_on_off_div(b,b.v);
b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
 