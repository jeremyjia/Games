var tag = "playground.js_v0.21";
var tb = bl$("id_p1_tb"); 
  
tb.btnPlayground = blo0.blBtn(tb,"btnPlayground","Playground",blGrey[2]);
tb.btnPlayground.style.float = "left";
    
tb.btnPlayground.onclick = function(){ 
    if(!this.pg)  this.pg = new CPlayground(btn4p1.v);
    this.pg.show(this); 
}
     

function CPlayground(parentDiv){
    var p = parentDiv;
    var ui = null;
    var w = 360;
    var h = 240;
    var xDbg = 20;
    var yDbg = 111;
    var wDbg = 20;
    var hDbg = 20;
    var cDbg = "brown";


    this.show = function(b){
        if(!ui){
            ui=blo0.blMDiv(p,"id_mdiv_4_playground","playground",555,5,w,111,blGrey[0]);
            ui.inf = {};
            ui.inf.x = 0;
            ui.inf.y = 0;
            ui.inf.click = "no click";
                        
            ui.inf.text = "playground.text";     

            var tb = blo0.blDiv(ui, "id_4_tb_playground","tb",blGrey[1]);
            tb.btnPlay = blo0.blBtn(tb,"id_4_btnPlay","play",blGrey[2]);
            tb.btnPlay.style.float = "left";
            tb.btnPlay.onclick = function(){
                o.play(this);
            }
            tb.b1 = o.dbgBtn(tb,"id_btn_4_dbgPlayground","dbg");

            var vStatus = blo0.blDiv(ui,"id_4_vStatus","status::",blGrey[3]);   
            var v1 = blo0.blDiv(ui,ui.id+"v1","",blGrey[1]);          
                

            var cvs = document.createElement("canvas");
            cvs.width = w;
            cvs.height = h;
            cvs.style.backgroundColor = "grey";
            cvs.style.float = "left";

            v1.appendChild(cvs);
            
            cvs.addEventListener('mousedown', function (e) {
                var x = e.offsetX;
                var y = e.offsetY;
                o.mousedown(cvs.getContext("2d"),x,y);                
            });
            
            ui.mousedown = function(x,y){   
                if(!tb.b1.b) return;

                if(cDbg=="brown"){
                    if(o.inRect(x,y,xDbg,yDbg,wDbg,hDbg)){
                        cDbg = "yellow";
                        o.status(ui);
                    }
                }
                else if(cDbg=="yellow"){
                    cDbg = "brown";
                    xDbg =x;
                    yDbg = y;                    
                }
            }
            ui.draw = function(ctx){
                if(tb.b1.b)  {
                    o.rect(ctx,xDbg,yDbg,wDbg,hDbg,cDbg);    
                    o.text(ctx,ui.id,xDbg,yDbg);
                    o.text(ctx,ui.inf.click,xDbg,yDbg+20);
                }   
            }
            o.reg2draw(ui);
            o.regMousedown(ui);

            var itv = setInterval(o.ftnTimer, 20,cvs.getContext("2d"),w,h);
        }
        _on_off_div(b,ui);
        b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
    }; 
}