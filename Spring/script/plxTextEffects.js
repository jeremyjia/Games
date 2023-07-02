var canvas;
var ctx;
var w = 1024;
var h = 768;

function animateFrame(time) {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d'); 
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "white";   
    	
    drawOverlay(time);
 
}

// Text content and font settings
var text = "欢迎来到漂泊者乐园一起交流学习";
var font = "36px Arial";
var fontColor = "rgba(0,201,87,0.3)"; // Green color
var highlightColor = "rgba(65,105,225,1)"; // Blue color

// Calculate the duration in milliseconds for each character
var frameDuration = 700; // 0.7 second duration

function drawOverlay(time) {  
    // Calculate the current frame index
    var frameIndex = Math.floor(time * 1000 / frameDuration);

    frameIndex = frameIndex%(text.length+1);
  
    // Calculate the position to start drawing the text
    var startX = 50;
    var startY = 650;  
    // Set the font style and color
    ctx.font = font;
    ctx.fillStyle = fontColor;
  
    // Iterate over each character in the text
    for (var i = 0; i < text.length; i++) {
      // Calculate the position for the current character
      var x = startX + (i * ctx.measureText(text[i]).width);
      var y = startY;
      // Set the fill color based on whether the character should be highlighted or not
      ctx.fillStyle = (frameIndex >= i) ? highlightColor : fontColor;
      // Draw the character at the appropriate position
      ctx.fillText(text[i], x, y);
    }
  
  }

  // 插件统一的对外接口, 用于设置可变参数，参数个数任意，类型是String
function setPlxArguments() {
      for(var i=0; i<arguments.length; i++){
        if(i==0){
          text = arguments[0]; 
        }else if(i==1){
          font = arguments[1];
        }
      }
}