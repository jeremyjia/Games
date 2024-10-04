// 获取画布元素和上下文
var canvas = document.getElementById('drawingCanvas');
var ctx = canvas.getContext('2d');

// 初始化annyang
if (annyang) {
    // 设置识别语言为简体中文
    annyang.setLanguage('zh-CN');

    // 定义语音命令及其回调函数
    var commands = {
        '画一个红色圆形': function() {
            drawCircle('red');
        },
        '画一个蓝色矩形': function() {
            drawRect('blue');
        },
        '画一个绿色三角形': function() {
            drawTriangle('green');
        },
        '清除画布': function() {
            clearCanvas();
        }
    };

    // 将命令添加到annyang
    annyang.addCommands(commands);

    // 启动annyang
    annyang.start();
}

// 绘制圆形的函数
function drawCircle(color) {
    ctx.beginPath();
    ctx.arc(200, 200, 50, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

// 绘制矩形的函数
function drawRect(color) {
    ctx.beginPath();
    ctx.rect(150, 150, 100, 100);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

// 绘制三角形的函数
function drawTriangle(color) {
    ctx.beginPath();
    ctx.moveTo(200, 100);
    ctx.lineTo(250, 250);
    ctx.lineTo(150, 250);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

// 清除画布的函数
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}