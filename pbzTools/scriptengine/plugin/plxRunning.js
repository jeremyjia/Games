var canvas;
var ctx;
var imgObj = new Image();
var index=0;
function animateFrame(time) {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');            
    ctx.clearRect(0, 0, 2048, 1536);
    imgObj.src = "https://img-blog.csdnimg.cn/90e2883e5d4241d78aa282a0e7d963f0.jpeg";
    
    //绘制图片
    ctx.drawImage(imgObj, index * 185, 0, 180, 325, 210, 35, 180, 325);
    index++;
     if (index>7) {
        index= 0;
     }
}

