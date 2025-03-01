const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function drawHalfFilledChar(char, x, y, fontSize, fillColor) {
    // Set font properties
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Measure text width and height
    const textMetrics = ctx.measureText(char);
    const textWidth = textMetrics.width;
    const textHeight = fontSize; // Approximation, may vary slightly based on font

    // Fill half of the character
    //*
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x - textWidth / 2, y - textHeight / 2); // Top-left corner of text bounding box
    ctx.lineTo(x + textWidth / 2, y - textHeight / 2); // Top-right corner
    ctx.lineTo(x + textWidth / 2, y); // Middle-right of text (not strictly necessary for half-fill, but helps define the path)
    ctx.quadraticCurveTo(x + textWidth / 2, y + textHeight / 4, x, y + textHeight / 2); // Quadratic curve to the bottom-middle
    ctx.quadraticCurveTo(x - textWidth / 2, y + textHeight / 4, x - textWidth / 2, y); // Quadratic curve to the middle-left
    ctx.lineTo(x - textWidth / 2, y - textHeight / 2); // Back to top-left
    ctx.closePath();
    ctx.fill();
//*/
    // Optionally, stroke the path to see the clipping area (for debugging)
     ctx.strokeStyle = 'red';
     ctx.stroke();

    // Draw the text with a transparent fill to see the clipping effect
    ctx.fillStyle = 'rgba(40,0,20,0)'; // Transparent fill
    ctx.fillText(char, x, y);

    // Optionally, stroke the text to see its outline (for debugging)
     ctx.strokeStyle = 'blue';
     ctx.strokeText(char, x, y);
}

// Draw a half-filled 'A' character
//drawHalfFilledChar('Basdf', canvas.width / 2, canvas.height / 2, 100, 'black');

// 绘制字符
ctx.font = '48px Arial';
ctx.fillStyle = 'black';
ctx.fillText('B', 50, 100);

// 绘制遮罩矩形（半透明）
ctx.fillStyle = 'rgba(255, 255, 255, .5)'; // 白色半透明
ctx.fillRect(25, 50, 44, 100); // 遮罩掉字符的一半（调整位置和大小以适应字符）
