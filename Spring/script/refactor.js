//code name=源码插件动画

var height = 600;
var x1 = 20;
var y1 = 20;
function animateFrame(time, ctx) {
       ctx.clearRect(0, 0, 2048, 1536);
       ctx.fillStyle = "red";
       ctx.font = "40px Arial";  
       x1 +=10;
       y1 +=10;

       if(time%100==1){
          x1 = 10;
          y1 = 10;
       }
       ctx.fillText("动画演示!", x1, height/2);
       ctx.fillStyle = "yellow"; 

       ctx.fillRect(30, y1, 60, 60);
       var myDate = new Date();
       var strTime = myDate.toLocaleString();
       ctx.fillStyle = "Blue";
       ctx.fillText(strTime, 10, height/3);
}