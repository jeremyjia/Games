
var request = require('request');
var cheerio = require('cheerio');

var e = {};
module.exports = e;

e.index = function(req,res){
    request('https://www.51voa.com/',function(error,response,body){
      if(!error && response.statusCode ==200){
        $ = cheerio.load(body);

        s = "<a  href='http://www.baidu.com'>baidu</a><br>";
        s +="<a href='http://www.sohu.com'>sohu</a>";//as
        res.send(s);
        /*
        res.json({
          'asdf':$('.list').length
        });
        */
      }
  }); 
}