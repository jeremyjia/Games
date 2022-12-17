var canvas;
var ctx;
var w = 1024;
var h = 768;
var alpha = 0.5

function animateFrame(time) {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d'); 
    ctx.clearRect(0, 0, w, h);
	
	ctx.fillStyle = "white";   
    ctx.fillRect(0,0,w,h);

    if(time%100==0){
	  alpha = Math.random()*(1);
    }	
	
	for(var i=0; i<=50; i++){   
	    var R = Math.floor(Math.random() * 255);   
        var G = Math.floor(Math.random() * 255);   
        var B = Math.floor(Math.random() * 255);   
        ctx.fillStyle = "rgba("+R+","+G+","+B+","+alpha+")";   
        ctx.beginPath();   
        ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 100, 0, Math.PI * 2);   
        ctx.fill();   
    }   
}