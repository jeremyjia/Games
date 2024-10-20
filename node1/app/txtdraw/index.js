const tag_txtDraw= "txtDraw/index.js bv0.22";    
const l = require('../../logger.js'); 
const c = require('../../util/canvas.js'); 
//const { Canvas } = require('node-drawille-canvas');

  

l.tag1(tag_txtDraw,"--tag_txtDraw---------------------------")
 

var e = {};
module.exports = e;

e.toDraw = function(req,res){ 
    res.status(200);
    console.log(req.body);
     
    

    var r = {}; 
    r.time = Date();
    r.error = "npm install node-drawille-canvas : failed! can't test _fn2do(r)";  
    r.test = c.toDraw();

    res.json(r); 
}
const _fn2do = function(r){
    const width = 20;
    const height = 10;
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#FFFFFF'; // 设置填充颜色（白色）
    ctx.fillRect(0, 0, width, height); // 绘制一个填充矩形

    ctx.strokeStyle = '#000000'; // 设置描边颜色（黑色）
    ctx.strokeRect(1, 1, width - 2, height - 2); // 绘制一个描边矩形

    ctx.beginPath();
    ctx.arc(10, 5, 4, 0, Math.PI * 2); // 绘制一个圆形
    ctx.stroke(); // 描边圆形
  
    r.txt = canvas.frame();

}