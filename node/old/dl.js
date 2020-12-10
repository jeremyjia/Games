var fs = require('fs'),
  request = require('request');

request
  .get('https://av.voanews.com/clips/VLE/2020/05/29/4dc40a42-9258-4a1e-b6ce-369292150d54.mp3')
  .on('error', function(err) {
    console.log("err:" + err);
  })
  .pipe(fs.createWriteStream('2.mp3'));


request
  .get('https://gdb.voanews.com/73890c6d-7544-4044-ad65-eac3f4eabc6f_cx0_cy6_cw0_w1023_r1_s.jpg')
  .on('error', function(err) {
    console.log("err:" + err);
  })
  .pipe(fs.createWriteStream('as11.jpg'));

request
  .get('https://learningenglish.voanews.com/a/most-economists-expect-slow-recovery-from-covid-19/5439414.html')
  .on('error', function(err) {
    console.log("err:" + err);
  })
  .pipe(fs.createWriteStream('as11.html'));

let body = '';
request
  .get('https://learningenglish.voanews.com/a/most-economists-expect-slow-recovery-from-covid-19/5439414.html')
  .on('error', function(err) {
    console.log("err:" + err);
  })
  .on('data', chunk => {
          //console.log("chunk=" + chunk); 
          body += chunk.toString();
          console.log ("body=" + body + ":" + Date());
  })
  .on('end',() => {
  		console.log("end " + Date());
  });