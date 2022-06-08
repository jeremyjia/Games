 
const tagScrapingAntClient = "index.js : bv 0.25";
var e = {};
module.exports = e;

e.scrape = function(req,res){ 
    const ScrapingAntClient = require('@scrapingant/scrapingant-client');

    const client = new ScrapingAntClient({ apiKey: 'debdb64f1a0f4837ba2425d83fe7a30d' });
 
    client.scrape('https://learningenglish.voanews.com/')
        //.then(res1 => console.log("xd:" + JSON.stringify(res1)))
        .then(test)
        .catch(err => console.error("xd:" + err.message));
        
    var r = {};
    r.tagScrapingAntClient = tagScrapingAntClient;  
    res.json(r);
}

function test(res1){
    console.log("xd:" + JSON.stringify(res1));
}