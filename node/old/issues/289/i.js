const express = require('express') 
const app = express()
const port = 8080  
const myjr = require("./jwtRedis.js");
const bodyParser = require('body-parser');
const secret = 'secret'; 
const jti = 'test';

app.use(bodyParser.json());

app.get('/', (req, res) => {    
    var o = {};
    o.api = "home";
    res.json(o);
});

app.get('/aLogin', (req, res) => { 
    myjr.aSign(secret,req,res);    
});

app.get('/aVerify', (req, res) => {
    myjr.aVerify(secret,req,res); 
}); 

app.get('/aDestroy', (req, res) => {
    myjr.aDestroy(secret,req,res); 
}); 
app.get('/test3', (req, res) => {
    var o = {};
    o.api = "test3";
    myjr.test3();
    res.json(o);
});
app.post('/login', (req, res) => { 
    var o       = {};
    o.v         = "v0.12"; 

    
    var pl = {}; 
    pl.user = req.body.user;
    pl.password = req.body.password;

    myjr.sign(jti,secret,function(token){
        o.token = token;
        res.json(o);
    });    
    
});

app.post('/logout', (req, res) => { 
    var o       = {};
    o.v         = "v0.12"; 
 

    myjr.destroy(req.body.jti,secret,function(s){
        o.s = s;
        res.json(o);
    });    
    
});
app.get('/getInfo', (req, res) => {
    var o       = {};
    o.v         = "v0.12";
    o.token     = req.body.token;
    myjr.verify(o.token,secret,function(s){
        o.verifyResult = s;
        res.json(o);  
    });
    
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

 