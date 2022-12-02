
var w = 1024;
var h = 768;
var dx=300;
var dy=500;
//函数quadraticCurveTo： 第一个点是用于二次贝塞尔计算中的控制点，第二个点是曲线的结束点。曲线的开始点是当前路径中最后一个点

function animateFrame(time) {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d'); 
    ctx.clearRect(0, 0, 2048, 1536);
	ctx.strokeStyle="Blue";
	ctx.lineWidth = 6;	
	
	//将坐标原点平移
	ctx.translate(dx,dy);
    ctx.beginPath();
	 //起点
    ctx.moveTo(0,0);     
    //右边二次贝塞尔曲线
    ctx.quadraticCurveTo(100,-100,100,-200);
    //上半圆
    ctx.arc(0,-200,100,0,Math.PI,true);
    //左边二次贝塞尔曲线
    ctx.quadraticCurveTo(-100,-100,0,0);

    ctx.stroke();
    ctx.closePath();
	ctx.translate(-dx,-dy);
	
	var h1 = Math.random()*(0.9*h-0.8*h)+0.8*h;
	dy += 6;
	if(dy>=h1){
	   dy = 300;
	}
	
	ctx.beginPath();
	ctx.strokeStyle="rgba(0,255,0,0.4)";			
	ctx.lineWidth=3;	
	ctx.moveTo(100,180);						
	ctx.lineTo(200,50);							
	ctx.lineTo(300,200);						
	ctx.stroke();
	ctx.beginPath();							
	ctx.moveTo(100, 180);
	ctx.lineWidth = 3;
	ctx.strokeStyle="rgba(255,135,0,1)";	
	ctx.quadraticCurveTo(200, 50, 300, 200);			
	ctx.stroke();
	ctx.closePath();
}
   