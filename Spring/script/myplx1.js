var strV = "[myplx1.js] _ v0.24";
var nIndex = 0;

function CFrame(){
    var _n = 0;
    var _fpp = function(_i){
        if(_i%100==0){
            _n++;
        }
    }
    var _render = function(ctx,_i){
        _fpp(_i);
        ctx.fillText(_n, 333 , 22); 
    }
    this.frame = function(ctx,_i){
        _render(ctx,_i);
        ctx.fillText(strV, 10 , 22); 
    };
};

var f = new CFrame();

function animateFrame(time) {
    if(time%100==0){
        nIndex++;
        if(nIndex>8) nIndex = 1;
    }
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');      
    ctx.clearRect(0, 0, 2048, 1536);

    f.frame (ctx,time);    

    ctx.fillStyle = "red";
    for(var n = -1; n < nIndex -1 ; n++){
        ctx.fillRect(10 + n*110, 33, 100, 100); 
        ctx.font = "30px Arial";
        ctx.fillText(n+1, 10 + n*110, 210); 
    }

    var nn = Math.floor(nIndex);
    ctx.font = "30px Arial";
    ctx.fillText(nn, 10 , 310); 

    
    var x = time;
    var y = 122;
    ctx.fillStyle = "blue";
    for (var i = 0; i < 110; i++) {
        x = 10+i;  
        if(nn%2) y = 122 + i;
        else y = 244 - i;
        x += 110*(nIndex-1);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2, true);
        ctx.fill();
    }
}