var canvas;
var ctx;
var imgObj = new Image();
var d_x=1;
function animateFrame(time) {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');            
    ctx.clearRect(0, 0, 2048, 1536);
    imgObj.src = "https://www.w3schools.com/graphics/pic_the_scream.jpg";
    
	ctx.font="20px Georgia";
    drawPicture(ctx);
	update();
}

function update(){
	d_x += 10;
	if (d_x >= 500 ) {
		d_x = 1;
	}
} 
function drawPicture(ctx) {
	ctx.drawImage(imgObj, 0, 0);
	ctx.drawImage(imgObj, d_x, 50, 100,100);//缩放
	ctx.fillText("缩放",d_x, 50);
	ctx.drawImage(imgObj, 10, 10, 100,100, d_x,300,100,100);//裁剪
	ctx.fillText("裁剪",d_x, 300);
}
