const tag = "[index.js_v0.0.3]";

const express = require('express')
var request = require('request');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(tag + ' Hello World!')
})
app.get('/geturl', function(req, res){
    var url = "https://learningenglish.voanews.com/a/study-suggests-people-who-got-covid-19-protected-for-months/5670611.html";
	console.log(url);

	// request module is used to process the yql url and return the results in JSON format
	request(url, function(err, resp, body) {
		//body = JSON.parse(body);
		var s = body; 
	  // pass back the results to client side
		res.send(s);
	}); 
})

app.listen(port, () => {
  console.log(tag + ` Example app listening at http://localhost:${port}`)
})