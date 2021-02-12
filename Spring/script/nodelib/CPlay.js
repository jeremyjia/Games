const tag = "[nodelib/CPlay.js_v0.252]";


function CToolbar (){
    var ui = bl$("id_4_MDiv_CPlay");
    var x = 50;
    var y = 50;
    var w = 100;
    var h = 20;
    var listLayer = [];
    this.show = function(ctx){
        ctx.fillStyle = "yellow";
        ctx.font = "20px Arial";
        ctx.fillRect(x,y,w,h);
        ctx.fillText(listLayer.length,x,y+55);
        for(i in listLayer){
            listLayer[i].show(ctx);
        }
    }
    this.toCtxMousedown = function(_x,_y){
        x = _x;
        y = _y;
    }
    ui.b1 = blo0.blBtn(ui.tb,ui.tb+"plB1","plB1",blGrey[1]);
    ui.b1.onclick = function(){    
        var n = listLayer.length + 1;
        var vl = blo0.blDiv(ui.v0,ui.v0.id+"vl"+n,"vl"+n,blGrey[3]); 

        vl.listSprite = [];
        vl.b1 = blo0.blBtn(vl,vl.id+"b1","b1",blGrey[0]);
        vl.b1.onclick = function(){
            var p = this.parentElement;
            var s = new blo0.blprite(x+100+w+p.listSprite.length*90,y+n*60,20,20);
            blo0.regCtxMousedown(s);
            p.listSprite.push(s);
        }

        vl.show = function(_n,_vl){
            return function(ctx){
                ctx.fillStyle = "brown";
                ctx.font = "20px Arial";

		    var d = 80;
		    var x0 = 20;
                ctx.fillRect(x0+x+d,y+d*_n,w,h);
                ctx.fillText(_n,x0+x,y+d*_n);
                ctx.fillText(_vl.listSprite.length,100+ x0+x,y+d*_n);
                for(i in _vl.listSprite){
                    _vl.listSprite[i].show(ctx);
                }
            }
        }(n,vl);
        listLayer.push(vl);
    }  

}

function CPlay (){
    var tb = new CToolbar();
    var c = "lightgreen";
    var fps = 30;
    var x = 10;
    var y = 10;
    var w = 50;
    var h = 50;
    var ms0 = 0;
    var dms = 0; 
    var img = new Image();
    var o = { 
    };
    o.getFrameNo = function(){
        var dt = 1000/fps;
        return dms/dt;
    }
    o.getMsg = function(){
        var s = tag +"_getMsg():";
        s+="["+x+","+y+"]";
        s+= " dms="+dms;
        s+= " fps=" + fps;
        s+= " FrameNo=" + o.getFrameNo();
        return s;
    }
    o.showImg = function(ctx,x,y,w,h,iUrl){ 
        img.src = iUrl;
        ctx.drawImage(img, x,y,w,h);

        ctx.fillStyle = "yellow";
        ctx.font = "20px Arial"; 
        ctx.fillText(iUrl, x,y);
    }
    this.getCurFameNO = function(){
        return f;
    };
    this.toPlay = function(){
        var d = new Date();
        ms0 = d.getTime();
    };
    this.toStop = function(){
        //alert("stop...");
    };
    
    this.toShowCurFrame = function(ctx){    
        var dNow = new Date();
        dms = dNow.getTime() - ms0;
        ctx.fillStyle = c;
        ctx.font = "20px Arial";
        ctx.fillRect(x,y,w,h);
        ctx.fillText( o.getMsg(), x,y+10);
        if(x%2==0 ){
            o.showImg(ctx,x,y,50,50,"https://www.w3schools.com/graphics/smiley.gif");  
        }
        else{
            o.showImg(ctx,x,y,50,50,"https://www.w3schools.com/graphics/angry.gif"); 
        }
        tb.show(ctx);
    };
    this.toCtxMousedown = function(_x,_y){
        x = _x;
        y = _y;
    }
    //blo0.regCtxMousedown(this);
    //blo0.regCtxMousedown(tb);
}

blo0.p = new CPlay();   
 
