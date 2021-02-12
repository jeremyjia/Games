 
blo0.blAjx(w,"nodelib/CPlay.js");    

const tag = "[plx/p2.js_v0.151]";
const b = bl$("plx_p2_btn"); 
b.v = blo0.blMDiv(b.parentElement,"id_4_MDiv_CPlay",tag,333,1,55,55,blGrey[0]);

if(!b.v.parent){
    b.v.parent = bl$("id_mdiv_load_plxMng");
    b.v.parent.list.push(b.v);
    
    b.v.tellMe = function(_o){
        b.v.o = _o;
        blo0.ShowSprite2Div(b.v.v2,b.v.o);
    }
    b.v.parent.listDivFrameMsg.push(b.v);
    b.v.showFrame = function(_f,_ga){ 
        var dd = bl$("id_4_plx2_dbg2"); 
        dd.innerHTML = _f  + ":" + _ga.x;
        dd.showCurFrame(_ga);
    }
}
b.v.style.width = "300px";
b.v.tb = blo0.blDiv(b.v,b.v.id+"tb","tb",blGrey[0]);

//*
var sss = '<video id="myVideo" width="180" height="120" controls>';
sss+= '<source src="1.mp3" type="video/mp4">';
sss+='Your browser does not support HTML5 video. '
sss+='</video>';
//*/

b.v.v0 = blo0.blDiv(b.v,b.v.id+"v0","v0",blGrey[1]);
b.v.v1 = blo0.blDiv(b.v,b.v.id+"v1",sss,blGrey[1]);
var p = bl$("myVideo");
p.controls = false;
b.v.v2 = blo0.blDiv(b.v,"id_4_plx2_dbg2","v2",blGrey[2]);
b.v.v2.showCurFrame = function(_ga){
    var ctx = _ga.context;
    ctx.fillStyle = "yellow";
    ctx.fillRect(0,0,20,20);
    ctx.fillText( tag + "_" + Date(), 230,10);

    if(b.v.sf) b.v.sf(ctx);
    
};

b.v.tb.b1 = blo0.blBtn(b.v.tb,b.v.tb.id+"b1","b1",blGrey[2]);
b.v.tb.b1.onclick = function(){
    _on_off_div(null,b.v.v2);
}  

b.v.tb.bPlay  = blo0.blBtn(b.v.tb,b.v.tb.id+"bPlay","Play",blGrey[2]);
b.v.tb.bPlay.onclick = function(){
    if(!this.loadClass){
        this.loadClass = true;
        this.b=false;  
                 
    }
    if(this.b){
        this.b = false;
        this.innerHTML = "Play";
        blo0.p.toStop();        
        b.v.sf = null;
        var p = bl$("myVideo");
        p.pause();
    }
    else{
        this.b = true;
        this.innerHTML = "Stop"; 
        blo0.p.toPlay();       
        b.v.sf = blo0.p.toShowCurFrame; 

        
        var p = bl$("myVideo");
        p.currentTime = 0;
        p.play();
    }
}  


_on_off_div(b,b.v);
b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
