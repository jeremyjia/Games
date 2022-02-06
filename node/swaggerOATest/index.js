'use strict';

var path = require('path');
var http = require('http');
const jwt = require('jsonwebtoken');

var formidable = require('formidable');

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

const conf = require('../config');

// swaggerRouter configuration
var options = {
    controllers: path.join(__dirname, './controllers')
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
expressAppConfig.addValidator();
var app = expressAppConfig.getApp();

app.get('/token',(req,res) => {
    const _v_api = "v0.14";
    console.log("/token " + _v_api);
    res.json({
        message: '/token ' + _v_api + ' : Welcome to the API' + Date()
    })
})
app.post('/login', (req, res) => {
    const _v_login = "v0.43";
    console.log("login " + _v_login + Date() + " " + req.headers['content-type'] + "" + req.body);
    
    console.log("\n body: " + JSON.stringify(req.headers));
    console.log("\n body: " + JSON.stringify(req.body));

    console.log("\n body: " + JSON.stringify(req.body.client_credentials));
     //{"grant_type":"client_credentials","scope":"write"}
    var form = new formidable.IncomingForm();
    console.log("\n form: "  +  JSON.stringify(form));

    //console.log("\n req: "  +  JSON.stringify(req));

    form.parse(req, function (err, fields, files) {
        console.log(JSON.stringify(fields));  
    });


    // Mock user
    const user = {
        v: _v_login,
        id: 1,
        username: 'yongling',
        emial: 'yongling.huang@group6.io'
    }
    jwt.sign({user: user}, conf.jwt_secret ,{ expiresIn: '3600s'},(err, token) => {
        console.log(token);
      //  res.write("xdtest...");        res.end();
        res.json({            token        });
    });
});

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)' + Date() , serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

