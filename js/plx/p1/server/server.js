var tagServer = "server.js_v0.35";
var tb = bl$("id_p1_tb"); 
    
tb.btnServer = blo0.blBtn(tb,"btnServer","Server",blGrey[2]);
tb.btnServer.style.float = "left";

tb.btnServer.onclick = function(){
    if(!this.pg)  this.pg = new CServer(btn4p1.v);
    this.pg.show(this);
} 

function CServer(parentDiv){
    var p = parentDiv;
    var ui = null;
    var x = 0;
    var y = 220;
    var w = 500;
    var h = 50;
    var xDbg = 20;
    var yDbg = 55;
    var wDbg = 20;
    var hDbg = 20;
    var cDbg = "lightgreen";
    var __o = o;
    
    this.show = function(b){ 
        if(!ui){
            ui=blo0.blMDiv(p,"id_mdiv_4_server",tagServer,x,y,w,h,blGrey[0]);
            
            ui.inf = {};
            ui.inf.x = 123;
            ui.inf.y = 321;
            ui.inf.l8080 = "http://localhost:8080";  
            ui.inf.href = window.location.href;  
            ui.inf.file = "No file.";  
            ui.inf.text = "server.text";   

            
            var tb4Client = blo0.blDiv(ui,"id_tb4Client","client-11",blGrey[1]);
            blo0.blScript("id_js_Client","js/plx/p1/client/client.js");
            


            var tb = blo0.blDiv(ui, "id_4_tb_server","tb",blGrey[1]);
            var v = blo0.blDiv(ui, "id_4_v_server","v",blGrey[2]);
            tb.b1 = __o.dbgBtn(tb,"id_btn_4_dbgServer","dbg");
            __o.getServerFiles(tb,v,"json");  
            __o.getServerFiles(tb,v,"mp4");   
            
            blo0.blScript("id_js_load_server-mp3","js/plx/p1/server/mp3.js");
            blo0.blScript("id_js_load_server-jpg","js/plx/p1/server/jpg.js");
            blo0.blScript("id_js_load_server-js","js/plx/p1/server/js.js");
            blo0.blScript("id_js_load_server-webm","js/plx/p1/server/webm.js");
            blo0.blScript("id_js_load_server-html","js/plx/p1/server/html.js");
            blo0.blScript("id_js_load_server-voa","js/plx/p1/server/voa/voa.js");
            blo0.blScript("id_js_load_server-bat","js/plx/p1/server/bat.js");
            blo0.blScript("id_js_load_server-bat","js/plx/p1/server/test/index.js");

            
            ui.draw = function(ctx){
                if(tb.b1.b)  {
                    __o.rect(ctx,xDbg,yDbg,wDbg,hDbg,cDbg);    
                    __o.text(ctx,ui.id,xDbg,yDbg);
                    __o.rendFile(ctx,ui.inf.file,xDbg+20,yDbg+20,192,108);
                }   
            }
            ui.mousedown = function(x,y){   
                if(!tb.b1.b) return;

                if(cDbg=="lightgreen"){
                    if(__o.inRect(x,y,xDbg,yDbg,wDbg,hDbg)){
                        cDbg = "yellow";
                        __o.status(ui);
                    }
                }
                else if(cDbg=="yellow"){
                    cDbg = "lightgreen";
                    xDbg =x;
                    yDbg = y;
                }
            }
            __o.regMousedown(ui);
            __o.reg2draw(ui);
        }
        _on_off_div(b,ui);
        b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];    
    }
}