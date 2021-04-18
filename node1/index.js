const express = require('express')
const app = express()
const port = 3000

const sq = require('./sequelize')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  var s = sq.f1();
  console.log(`Example app listening at http://localhost:${port}  ; s=` + s)
})