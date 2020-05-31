const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const port = 3000;

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/cTest',function(req,res){
  res.sendFile(path.join(__dirname+'/cTest.html'));
});

router.get('/c1Test',function(req,res){
  res.sendFile(path.join(__dirname+'/c1Test.html'));
});

router.get('/*.js',function(req,res){  
  res.sendFile(path.join(__dirname+ req.path));
});

//add the router
app.use('/', router);
app.listen(process.env.port || port);

console.log('v0.12: Running at Port ' + port);