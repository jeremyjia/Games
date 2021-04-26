const tag = "[exeshell.js_v0.0.3]";

const util = require('util');
//*
const exec = util.promisify(require('child_process').exec);

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

console.log('load:', tag);
var se = "";
async function esTest(sCMD) {
  try {
     
      wait(100);   
      const { stdout, stderr } = await exec(sCMD);
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      se = stdout;
  }
  catch (err) 
  {
     console.error(err);
  };
}; 
//*/
 
exports.run = async function(res,sCMD){
    var s = tag + " run..." + Date();
    console.log('s:', s);
    sCMD = sCMD.replace("%20"," ");

    await esTest(sCMD);

    s += se + Date();
    console.log('s:', s);
    res.send(s);
}