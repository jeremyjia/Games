const express = require('express')
const app = express()
var cors = require('cors')
const path = require('path');
var request = require('request');
var cheerio = require('cheerio');

const sgTest = require('./app/sendGrid.js');

const port = 3000 

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/spider', (req, res) => {
  request('http://www.jikexueyuan.com/',function(error,response,body){
      if(!error && response.statusCode ==200){
        $ = cheerio.load(body);
        res.json({
          'Classnum':$('.slide-submeu').length
        });
      }
  }); 
})

app.get('/email/', (req, res) => {
  var s = sgTest.sendEmail();
  res.send(s);
})

app.listen(port, () => { 
  console.log(`Example app listening at http://localhost:${port}`)
})