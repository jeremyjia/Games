 
const tagSpider = "index.js bv 0.22";
 
var fs = require('fs'); 

var e = {};
module.exports = e;

e.spider = function(req,res){ 
    fs.readFile('app/spider/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
}