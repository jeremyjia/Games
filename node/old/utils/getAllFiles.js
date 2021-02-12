const tag = " [utils/getAllFiles.js_v0.0.1]";

exports.allFiles = function (res,tb) {
    var s = tag + Date();
    var a = [];
    s = _getAllFiles("./utils",a);
    return s;
}

const fs = require("fs")
const path = require("path")

const _getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = _getAllFiles(dirPath + "/" + file, arrayOfFiles);
      console.log("xd1 " + file);
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
      console.log("xd2 " + file);
    }
  })

  return arrayOfFiles
}