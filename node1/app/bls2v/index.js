const tag_bls2v= "bls2v/index.js bv0.33";    
const l = require('../../logger.js'); 

var request = require('request');
const canvas = require('../../util/canvas.js');  
const command = require('../../util/command.js');  
//const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

l.tag1(tag_bls2v,"--tag_bls2v---------------------------")
 

var e = {};
module.exports = e;

e.createV = function(req,res){ 
    res.status(200);
    console.log(req.body);
    let q = req.query; 

    const directoryPath = 'public/tmp';      
    fs.readdirSync(directoryPath).forEach(file => fs.unlinkSync(path.join(directoryPath, file)));

    var r = {}; 
    r.time = Date();
    r.toDo = "call ffmpeg to create video from bls.";  
    r.install = " npm install fluent-ffmpeg ";
    r.q = q;

    request(q.bls,function(error,response,body){
        l.tag1(q.bls,"--q.bls---------------------------")  
        if(!error && response.statusCode ==200){
            //*
            r.vFile = "tmp/v2.mp4";
            r.body = body; 
                
            r.test = canvas.createImgsFromBls(body);

            command.run_Command(r,"ffmpeg",
                "-framerate 1 -i public/tmp/%03d.png -c:v libx264 -pix_fmt yuv420p public/tmp/v2.mp4");
            //*/
            res.json(r); 
        }
        else{
            r.error = "xxx";
            r.date = Date();
            res.json(r); 

        }
      }); 
   
} 

const ffmpegTest = function(){ 

   // 图片文件夹路径
   const imagesDir = path.join(__dirname, 'images');
   // 输出视频文件路径
   const outputVideo = path.join(__dirname, 'output.mp4');

   // 获取图片文件列表
   const imageFiles = fs.readdirSync(imagesDir)
     .filter(file => file.endsWith('.png') || file.endsWith('.jpg'))
     .map(file => path.join(imagesDir, file));

   // 检查是否有图片文件
   if (imageFiles.length === 0) {
     console.error('No image files found in the images directory.');
     process.exit(1);
   }

   // 设置 FFmpeg 命令
   const frameRate = 25; // 每秒帧数
   const inputFiles = imageFiles.map((file, index) => `-i ${file} -r ${frameRate / (index === 0 ? 1 : 0)}`).join(' -filter_complex "concat=n=' + imageFiles.length + ':v=1:a=0" ');

   // 注意：上面的 map 方法生成的命令可能不适用于所有情况，特别是当图片数量很多时。
   // 一个更简单且通常有效的方法是使用 image2pipe 输入。
   // 但是，这要求你以流的方式将图片数据传递给 FFmpeg，这超出了这个简单示例的范围。
   // 下面是一个使用 image2pipe 的示例（但在这个上下文中没有实现，因为它需要额外的代码来处理流）。

   // 为了简化，我们将使用 -framerate 参数和 glob 模式（需要 glob 模块或手动构造文件列表）
   // 但由于 glob 模块不是 fluent-ffmpeg 的直接依赖，我们在这里手动构造了文件列表。

   // 使用更简单的方法（适用于少量图片且不需要精确控制每帧显示时间的情况）
   const simpleCommand = `-framerate ${frameRate} -i ${imagesDir + '/*.png'} -c:v libx264 -pix_fmt yuv420p ${outputVideo}`;

   ffmpeg(simpleCommand)
     .on('start', commandLine => {
       console.log(`FFmpeg started: ${commandLine}`);
     })
     .on('progress', progress => {
       console.log(`Processing: ${progress.percent}% done`);
     })
     .on('end', () => {
       console.log('Video created successfully!');
     })
     .on('error', err => {
       console.error('Error: ' + err.message);
     })
     .run();
}
