 

var time1 = 0;
function animateFrame(time) {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
            
    ctx.clearRect(0, 0, 2048, 1536);

    ctx.fillStyle = "Blue";
    var x = time;
    ctx.fillRect(10, 10, 100, 100);
    ctx.font = "30px Arial";
   
    var fps = 100;
    _txt(ctx, "FPS:"+fps,111,150,"130px Arial","green");  
     
    if(time%fps==0) time1 = time;

    
    ctx.fillStyle = "Red";
    _myJob(ctx,time1);   
}

function _txt(ctx,txt,x,y,font,fillStyle) {
    var old_font = ctx.font;
    var old_fillStyle = ctx.fillStyle;
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.fillText(txt, x, y);
    ctx.fillStyle = old_fillStyle;
    ctx.font = old_font;
}
var lastLoop = new Date();
function _showFPS(ctx,time) {  

    var thisLoop = new Date();
    var fps = time + ":" + 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;

    
    var strFPS = "fps="+fps;
    _txt(ctx,strFPS,600,50,"30px Arial","red");
}
 
function _myJob(ctx,time) { 
    for (var i = 0; i < 2000; i++) {
        var x = Math.tan(time + i * 0.01) * 196 + 256;
        var y = Math.tan(time + i * 0.01234) * 196 + 256;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2, true);
        ctx.fill();
    }
    _showFPS(ctx,time);
}
