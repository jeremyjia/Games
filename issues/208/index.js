const tag = "[index.js_v0.0.11]";

const e = require('express');
const express = require('express')
var request = require('request');
var es = require('./exeshell.js');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(tag + ' Hello World!')
})

app.get('/exeshell', (req, res) => {
	console.log(req.url);
	var a = req.url;
	var b = a.split('?');
	var c = b[1].split('cmd=');
	var scmd = c[1];
	var s = es.run(res,scmd);
	//res.send(tag + ' s=' +s);
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