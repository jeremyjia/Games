const express = require('express')
const app = express()
var cors = require('cors')
const path = require('path');

const spider = require('./app/spider/index.js');
const sgTest = require('./app/sendGrid.js');

const port = 3001 

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/spider', (req, res) => {
  spider.spider(req,res);
})

app.get('/email/', (req, res) => {
  var s = sgTest.sendEmail();
  res.send(s);
})

app.listen(port, () => { 
  console.log(`Example app listening at http://localhost:${port}`)
})