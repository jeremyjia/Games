const tag = "[plx/mng.js_v0.122]";
blo0.tellPlxMng = function(me){
        var d0 = bl$("id_div_4_PlxMng_dbg");       
        d0.innerHTML = "["+ me.x + ","+me.y+"]";//blo0.blShowObj2Div(d0,me);    
        var dm = bl$("id_mdiv_load_plxMng");       
        dm.tellList(me);
}
blo0.showFrame2PlxMng = function(frame,ga){       
    var dm = bl$("id_mdiv_load_plxMng");   
    dm.frameDbg = blo0.blDiv(dm, dm.id+"frameDbg","frameDbg","lightblue");     
    dm.frameDbg.innerHTML = ga.x + "_" + frame + "_" + Date();
    dm.showFrame2List(frame,ga);
}

var d = blo0.blMD("id_mdiv_load_plxMng", tag,  300,100,400,100, blGrey[5]);
d.list = [];
d.tellList = function(_o){
    for(i in d.list){
        if(d.list[i].tellMe)     d.list[i].tellMe(_o);
    }
}
d.listDivFrameMsg = [];
d.showFrame2List = function(_o,_ga){
    for(i in d.listDivFrameMsg){
        if(d.listDivFrameMsg[i].showFrame)     d.listDivFrameMsg[i].showFrame(_o,_ga);
    }
}
if(!d.n) {d.n=0;} 
d.tb = blo0.blDiv(d, d.id+"tb","tb",blGrey[0]); 
d.tb.b0 = blo0.blBtn(d.tb,d.tb.id+"b0","plx0",blGrey[1]); d.tb.b0.innerHTML = d.n++;
d.tb.b1 = blo0.blBtn(d.tb,"plx_p1_btn","plx1",blGrey[1]);
d.tb.b1.onclick = function(){ 
    blo0.blAjx(w,"plx/p1.js");       
}

d.tb.b2 = blo0.blBtn(d.tb,"plx_p2_btn","plx2",blGrey[1]); 
d.tb.b2.onclick = function(){ 
    blo0.blAjx(w,"plx/p2.js");       
}

d.tb.b3 = blo0.blBtn(d.tb,"plx_p3_btn","plx3",blGrey[1]); 
d.tb.b3.onclick = function(){     
     blo0.blAjx(w,"plx/p3.js");       
}
d.tb.b4 = blo0.blBtn(d.tb,"plx_p4_btn","plx4",blGrey[1]); 
d.tb.b4.onclick = function(){     
     blo0.blAjx(w,"plx/p4.js");       
}

d.vDbg = blo0.blDiv(d, "id_div_4_PlxMng_dbg","dbg",blGrey[2]);
d.vDbg2 = blo0.blDiv(d, "id_div_4_PlxMng_dbg2","dbg2", "lightgreen");
_on_off_div(null,d);
