
const express = require("express");
const path = require('path');

const app = express();
const port = process.env.SERVER_PORT || 8000;


// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(express.static(path.join(__dirname, 'public')));

app.get("/api", (req, res) => {
  res.json("index2: /api");
});

app.listen(port, () => console.log(`Listening on port ${port}`));