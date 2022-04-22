
var request = require('request');
var cheerio = require('cheerio');

var e = {};
module.exports = e;

e.index = function(req,res){
    request('https://www.51voa.com/',function(error,response,body){
      if(!error && response.statusCode ==200){
        $ = cheerio.load(body); 
        
        res.status(200);
        var r = {};
        r.api = "spider";
        r.yaml = this.openApiYaml;
        r.query = req.query; 
        r.Classnum = $('.list').length;
        res.json(r);
      }
  }); 
}