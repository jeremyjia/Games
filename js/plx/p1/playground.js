var tagPlayground = "playground.js_v0.35";
var tb = bl$("id_p1_tb"); 
  
tb.btnPlayground = blo0.blBtn(tb,"btnPlayground",tagPlayground,blGrey[2]);
tb.btnPlayground.style.float = "left";
    
tb.btnPlayground.onclick = function(){ 
    if(!this.pg)  this.pg = new CPlayground(btn4p1.v,720,480);
    this.pg.show(this); 
}
     

function CPlayground(parentDiv,_w,_h){
    var p = parentDiv;
    var ui = null;
    var w = _w;//360;
    var h = _h;//240;
    var xDbg = 120;
    var yDbg = 111;
    var wDbg = 20;
    var hDbg = 20;
    var cDbg = "brown";
    var _mo = o;


    this.show = function(b){
        if(!ui){
            ui=blo0.blMDiv(p,"id_mdiv_4_playground",tagPlayground,555,5,w,111,blGrey[0]);
            ui.inf = {};
            ui.inf.x = 0;
            ui.inf.y = 0;
            ui.inf.clickStatus = "no click";
                        
            ui.inf.text = "playground.text";     

            var tb = blo0.blDiv(ui, "id_4_tb_playground","tb",blGrey[1]);
            tb.btnPlay = blo0.blBtn(tb,"id_4_btnPlay","play",blGrey[2]);
            tb.btnPlay.style.float = "left";
            tb.btnPlay.onclick = function(){
                _mo.play(this);
                blo0.play();                
            }
            tb.b1 = _mo.dbgBtn(tb,"id_btn_4_dbgPlayground","dbg");

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
                _mo.mousedown(cvs.getContext("2d"),x,y);                
            });
            cvs.addEventListener('mouseup', function (e) {
                var x = e.offsetX;
                var y = e.offsetY;
                _mo.mouseup(cvs.getContext("2d"),x,y);                
            });
            
            cvs.addEventListener('mousemove', function (e) {
                var x = e.offsetX;
                var y = e.offsetY;
                _mo.mousemove(cvs.getContext("2d"),x,y);                
            });
            
            ui.mousedown = function(x,y){   
                if(!tb.b1.b) return;

                if(cDbg=="brown"){
                    if(_mo.inRect(x,y,xDbg,yDbg,wDbg,hDbg)){
                        cDbg = "yellow";
                        ui.inf.clickStatus = " click." + Date();
                        xDbg =x;
                        yDbg = y;                    
                        _mo.status(ui);
                    }
                }
                else if(cDbg=="yellow"){
                    cDbg = "brown";
                    ui.inf.clickStatus = "no click."  + Date();
                    xDbg =x;
                    yDbg = y;                    
                }
            }
            ui.draw = function(ctx){
                if(tb.b1.b)  {
                    _mo.rect(ctx,xDbg,yDbg,wDbg,hDbg,cDbg);    
                    _mo.text(ctx,ui.id,xDbg,yDbg);
                    _mo.text(ctx,ui.inf.clickStatus,xDbg,yDbg+44);
                }   
            }
            _mo.reg2draw(ui);
            _mo.regMousedown(ui);

            var itv = setInterval(_mo.ftnTimer, 20,cvs.getContext("2d"),w,h);
        }
        _on_off_div(b,ui);
        b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];   
    }; 
}