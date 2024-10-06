const tag21voa = "21voa_v0.11";
var request = require('request');
var cheerio = require('cheerio');

var e = {};
module.exports = e;

e.index = function(req,res){
    request('https://www.21voa.com/',function(error,response,body){
      if(!error && response.statusCode ==200){
        $ = cheerio.load(body); 
        let ls = [];
        // 选择所有<a>标签并提取href属性
       $('a').each((index, element) => {
          const href = $(element).attr('href');
          let s = `链接 ${index + 1}: ${href}`;
          console.log(s);
          ls.push(s);
       });

        res.status(200);
        var r = {};
        r.time = Date();
        r.tag = tag21voa;
        r.yaml = this.openApiYaml;
        r.query = req.query; 
        r.Classnum = $('.list').length;  
        r.ls = ls;
        res.json(r);
      }
  }); 
}