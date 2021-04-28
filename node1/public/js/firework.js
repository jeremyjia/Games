var nTimes = 0;
function animateFrame(time) {
    if(time%100==0){
        nTimes++;
        if(nTimes>8) nTimes = 1;
    }
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');      
    ctx.clearRect(0, 0, 1111, 300);

    ctx.fillStyle = "red";
    for(var n = 0; n < nTimes -1 ; n++){
        ctx.fillRect(10 + n*110, 10, 100, 100); 
        ctx.font = "30px Arial";
        ctx.fillText(n+1, 10 + n*110, 210); 
    }

    var nn = Math.floor(nTimes);
    ctx.font = "30px Arial";
    ctx.fillText(nn, 10 , 310); 

    
    var x = time;
    var y = 122;
    ctx.fillStyle = "blue";
    for (var i = 0; i < 110; i++) {
        x = 10+i;  
        if(nn%2) y = 122 + i;
        else y = 244 - i;
        x += 110*(nTimes-1);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2, true);
        ctx.fill();
    }
}