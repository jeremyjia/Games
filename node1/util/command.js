const { spawn } = require('child_process');
const util = require('util');

var e = {};
module.exports = e;


// 创建一个返回 Promise 的 spawn 函数
const spawnPromise = util.promisify(spawn);

e.run_Command = async function (r,c,ps) { 
    let p = ps.split(' ');
    const child = spawn(c, p, {
        stdio: ['ignore', 'pipe', 'pipe'], // 忽略输入，将标准输出和标准错误管道化
        shell: false // 在这种情况下，我们不需要 shell: true，因为我们直接调用了 cmd.exe
      });
      
      child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        r.vFile = "tmp/v1.mp4";
      });
      
      child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
      
      child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
}
 