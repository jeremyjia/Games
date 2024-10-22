const tag_util_canvas= "util/canvas.js bv0.21";   
const l = require('../logger');  

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

l.tag1(tag_util_canvas,"--tag_util_canvas---------------------------")
 

var e = {};
module.exports = e;

e.toDraw = function(){  
         
    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext('2d');

    // 设置背景颜色为白色
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 200, 200);

    // 画一个红色的圆
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 2, true); // 外圈
    ctx.fillStyle = '#FF0000';
    ctx.fill();

    // 在画布上写一些文字
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000000';
    ctx.fillText('Hello, Canvas!', 50, 150);

    // 将画布内容转换为 buffer
    const buffer = canvas.toBuffer('image/png');

    // 将 buffer 写入文件
    fs.writeFileSync('public/tmp/output.png', buffer);

    console.log('Image saved as output1.png');
     return "tag_util_canvas" + Date();
}

e.createImgsFromBls = function(bls){  

    

    const w = 1920, h = 1040;
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');



    let n = 111;
    for(var i = 0; i<n; i++){
        
        let num = i +1;
        let paddedNum = num.toString().padStart(3, '0'); 
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, w, h);
        ctx.beginPath();
        ctx.arc(100, 100, 50, 0, Math.PI * 2, true); // 外圈
        ctx.fillStyle = '#FF0000';
        ctx.fill();
    
        ctx.font = '20px Arial';
        ctx.fillStyle = '#000000';
        ctx.fillText(Date(), 50, 44);
        ctx.fillText(bls, 50, 111);
        ctx.fillText('NO. ' + paddedNum, 50, 150);
     
        const buffer = canvas.toBuffer('image/png'); 
        fs.writeFileSync('public/tmp/' + paddedNum + '.png', buffer);
    
        console.log('Image saved as ' + paddedNum + '.png');

    }
    
}