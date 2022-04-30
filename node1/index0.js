const express = require('express')
const app = express()
var cors = require('cors')
const path = require('path');

const bodyParser = require('body-parser');

const spider = require('./app/spider/index.js');
const sgTest = require('./app/sendGrid.js');

const port = 3001 

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/post', (req, res) => {
  console.log('Got body:', req.body);
  r = {};
  r.v = "v0.12";
  r.body = req.body;
  res.json(r);//.sendStatus(200);
});

app.listen(port, () => { 
  console.log(`Example app listening at http://localhost:${port}`)
})