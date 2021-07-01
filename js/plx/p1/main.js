
const p1Tag = "[plx/p1.js_v0.331]";

const btn4p1 = bl$("plx_p1_btn");

if(btn4p1){ 
    btn4p1.v = blo0.blMD(btn4p1.id+p1Tag,p1Tag,0,121,666,555,blGrey[0]);
    var tb = blo0.blDiv(btn4p1.v,"id_p1_tb","tb0",blGrey[1]);
    
    if(!tb.loadUtil){
        blo0.blScript("id_js-loadUtil","js/plx/p1/util/o.js");
        tb.loadUtil = true;
    }
    if(!tb.loadPlayground){
        blo0.blScript("id_js_loadPlayground","js/plx/p1/playground.js");
        tb.loadPlayground = true;
    }
    if(!tb.loadServer){
        blo0.blScript("id_js_loadServer","js/plx/p1/server/server.js");
        tb.loadServer = true;
    }
    if(!tb.loadStoryBoard){
        blo0.blScript("id_js_loadStoryBoard","js/plx/p1/storyBoard.js");
        tb.loadStoryBoard = true;
    }


    btn4p1.onclick = function(){
        var b = this;
        _on_off_div(b,b.v);
        b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
    } 
    btn4p1.onclick();
}
 
