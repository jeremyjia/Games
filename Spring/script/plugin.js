function animateFrame(time) {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
            
    ctx.clearRect(0, 0, 2048, 1536);

    ctx.fillStyle = "Blue";
    var x = time;
    ctx.fillRect(10, 10, 100, 100);

    ctx.fillStyle = "Red";
    for (var i = 0; i < 2000; i++) {
        var x = Math.cos(time + i * 0.01) * 196 + 256;
        var y = Math.sin(time + i * 0.01234) * 196 + 256;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2, true);
        ctx.fill();
    }
}