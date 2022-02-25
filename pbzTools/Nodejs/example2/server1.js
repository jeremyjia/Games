
var ws = require("nodejs-websocket");
console.log("开始建立连接...")

var server = ws.createServer(function(conn){
  conn.on("text", function (str) {
    console.log("message:"+str)
    conn.sendText("My name is Jeremy Jia!");
  })
  conn.on("close", function (code, reason) {
    console.log("关闭连接")
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭")
  });
}).listen(8090)
console.log("WebSocket建立完毕")