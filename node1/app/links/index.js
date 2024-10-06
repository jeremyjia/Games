const tagLinks = "get all links in url page. v0.14";  
const l = require('../../logger'); 
var request = require('request');
var cheerio = require('cheerio'); 

l.tag1(tagLinks,"-----------------------app\\links\\index.js------")  

var e = {};
module.exports = e;

e.getHrefs = function(req,res){  
  res.status(200); 
  
  let = q = req.query; 
  var r = {};
  r.time = Date();

  if(q.url){
    r.url =  q.url; 
    if(q.file){
      if(q.times){
        u.specLinks1(q.url,q.file,q.times,res,r);
      }
      else{
        u.specLinks(q.url,q.file,res,r);
      }
    }
    else{
      u.allLinks(q.url,res,r);
    }
  }
  else{
    r.url = "xxx"; 
    res.json(r); 
  }
}
 
const u = function(){
  let o = {};
  o.allLinks = function(url,res,r){ 
    request(url,function(error,response,body){
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
       r.ls = ls;
       res.json(r); 
      }
    });  
  }
  o.specLinks = function(url,f,res,r){ 
    request(url,function(error,response,body){
      if(!error && response.statusCode ==200){
        $ = cheerio.load(body); 
        let ls = [];
        // 选择所有<a>标签并提取href属性
        $('a').each((index, element) => {
          const href = $(element).attr('href');
          if(href.endsWith(f)){
            let s = `链接 ${index + 1}: ${href}`;
            console.log(s);
            ls.push(s);
          }
       }); 
       r.file = f;
       r.ls = ls;
       res.json(r); 
      }
    });  
  }
  o.specLinks1 = function(url,f,t,res,r){ 
    request(url,function(error,response,body){
      if(!error && response.statusCode ==200){
        $ = cheerio.load(body); 
        let ls = [];
        let n = 0;
        let nIndex = 0;
        // 选择所有<a>标签并提取href属性
        $('a').each((index, element) => {
          const href = $(element).attr('href');
          let s = `链接 ${index + 1}: ${href}`; 
          if(href.endsWith(f)&&n<1){
            n++;
            ls.push(s);
            nIndex = index;
          } 
          if(index== nIndex+1&&index>1){
            ls.push(s);
          }
       });   
       r.file = f;
       r.times = t;
       r.ls = ls;
       res.json(r); 
      }
      else{
        
       r.error = "error:xxxx";
       res.json(r); 
      }
    });  
  }
  return o;
}();