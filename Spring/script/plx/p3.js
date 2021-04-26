const tag = "[plx/p3.js_v0.31]";
const b = bl$("plx_p3_btn"); 
 
 
b.v = blo0.blMDiv(b.parentElement,tag,tag,234,88,155,55,blGrey[0]); 
b.v.tb = blo0.blDiv(b.v,b.v.id+"tb","tb",blGrey[0]);

b.v.v1 = blo0.blDiv(b.v,b.v.id+"v1",s,blGrey[1]);
const ta = blo0.blTextarea(b.v.v1,b.v.v1.id+"ta","list",blGrey[1]);
ta.style.width = "95%";
ta.style.height = "95px";

b.v.tb.b1 = blo0.blBtn(b.v.tb,b.v.tb.id+"b1","b1",blGrey[2]);
b.v.tb.b1.onclick = function(){ 
    var w = {};
    w._do = function(txt){
        alert(txt);
    }
    var url = "command?cmd=" + ta.value;   
    blo0.blAjx(w,url);       
}  

 


_on_off_div(b,b.v);
b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
 