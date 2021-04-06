function animateFrame(time) {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
            
    ctx.clearRect(0, 0, 2048, 1536);

    ctx.fillStyle = "Blue";
    var x = time;
    ctx.fillRect(10, 10, 100, 100);

    ctx.fillStyle = "green";
    for (var i = 0; i < 555; i++) {
        var x = i;
        var y = 222;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2, true);
        ctx.fill();
    }
}