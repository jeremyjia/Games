var tagSO646 = "[so646.js]_v0.13";

   
function animateFrame2(time) {     
	const _sn = sn;
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');  
	
	ctx.fillStyle = 'lightblue';
	ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = 'red';
    ctx.font = "30px Verdana";
    ctx.fillText( tagSO646 + " _sn=" + _sn + " time=" + time, 110, 44);
	    
}