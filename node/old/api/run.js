const tag = "[old/api/run.js v0.15]"; 

exports.go = function (res) {     
  const { exec }  = require('child_process');
  const a1      = 'youtube-dl';
  const a2      = 'ls | grep js';
  const a3      = 'ffmpeg';
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.write(tag + Date());

  exec( a3, (err, stdout, stderr) => {
    if (err) { 
      console.error(err);
       
      res.write(`<br> ================ERROR!=================`);    
      res.write(`<br> stdout: ${err}`);      
      res.write(`<br> stdout: ${stdout}`);   
      res.write(`<br> stdout: ${stderr}`);   

      res.write("<br> Try: <a href='/old/index.html'>old/index.html</a>");
      res.end();  
    } else {
      res.write(`<br> ================GOOD!=================`);  
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      res.write(`<br> stdout: ${stdout}`);
      res.write(`<br> stdout: ${stderr}`);      

      res.write("<br> Try: <a href='/old/index.html'>old/index.html</a>");
      res.end();  
    }
  });

}; 
