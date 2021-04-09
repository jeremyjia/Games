function animateFrame1(time) {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 2048, 1536);
    ctx.fillStyle = "Blue";
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

function animateFrame(time) {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    clear(ctx);
    if (time % 2 == 0) {
        face(ctx, 45, 315);
    } else {
        face(ctx, 10, 350);
    }
}
var eyes = function (ctx) {//绘制眼睛
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;//设置线宽
    ctx.arc(275, 100, 50, 0 * Math.PI / 180, 360 * Math.PI / 180);//创建圆弧
    ctx.stroke();
    ctx.closePath();
};
var eyeball = function (ctx) {//绘制眼球
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.lineWidth = 8;
    ctx.arc(275, 100, 10, 0 * Math.PI / 180, 360 * Math.PI / 180);
    ctx.stroke();
    ctx.closePath();
};
var ball = function (ctx) {//绘制豆子
    x = 350;//设定圆弧x坐标
    ctx.beginPath();
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 20;
    ctx.arc(x, 200, 10, 0 * Math.PI / 180, 360 * Math.PI / 180);
    ctx.stroke();
    ctx.closePath();
};
var face = function (ctx, start, end) {//绘制脸
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 10;
    var circleX = 250;
    var circleY = 200;
    var circleR = 180;
    ctx.arc(circleX, circleY, circleR, start * Math.PI / 180, end * Math.PI / 180);

    var x1 = circleR * Math.cos(Math.PI / 180 * start) + circleX;  //三角函数要使用弧度
    var y1 = circleR * Math.sin(Math.PI / 180 * start) + circleY;
    var x2 = circleR * Math.cos(Math.PI / 180 * end) + circleX;
    var y2 = circleR * Math.sin(Math.PI / 180 * end) + circleY;
    ctx.moveTo(x2, y2);
    ctx.lineTo(250, 200);//画直线
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();//闭合路径
    
    //绘制眼睛，眼球和豆子
    eyes(ctx);
    eyeball(ctx);
    ball(ctx);
};
var clear = function (ctx) {//清除画布
    ctx.clearRect(0, 0, 2048, 1536)
};