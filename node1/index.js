const express = require('express')
const app = express()
var cors = require('cors')
const path = require('path');
var request = require('request');

const sgTest = require('./app/sendGrid.js');

const port = 3000
 
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/email/', (req, res) => {
  var s = sgTest.sendEmail();
  res.send(s);
})

app.listen(port, () => { 
  console.log(`Example app listening at http://localhost:${port}`)
})