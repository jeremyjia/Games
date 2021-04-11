var canvas;
var ctx;
var background;
var width = 300;
var height = 200;
var cloud;
var cloud_x=1;
function animateFrame(time) {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');            
    ctx.clearRect(0, 0, 2048, 1536);

    background = new Image();
	background.src = "http://silveiraneto.net/wp-content/uploads/2011/06/forest.png";
	// init cloud
	cloud = new Image();
    cloud.src = "http://silveiraneto.net/wp-content/uploads/2011/06/cloud.png";
    
    draw(ctx);
	update();
}

function update(){
	cloud_x += 3;
	if (cloud_x > 50 ) {
		cloud_x = 1;
	}
} 
function draw(ctx) {
	ctx.drawImage(background,0,0);
	ctx.drawImage(cloud, cloud_x, 0);
}
