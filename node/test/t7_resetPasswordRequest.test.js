const tag = "[t7_resetPasswordRequest.test.js v0.24] ";
const config = require('../config'); 
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.HOST_PORT, config.OPENAPI_YAML);
const request = require('supertest'); 
var assert = require('chai').assert; 

var ts = tag;

describe(ts, function() { 

    var n = 0;  
        
    n++;
    var et1 = "abc"; // bad email    
    it(tag+': resetPasswordRequest.', function() {    
      return request(ES.app)
        .get('/api/resetPasswordRequest?emailAddress=' + et1) 
        .set('accept', 'application/json') 
        .expect(200) 
        .then(response => {  
          var eRes = response.body.emailAddress;   
          assert(et1==eRes," eRes=" + eRes);
          var isOK = response.body.isOK;   
          assert("NO"==isOK," isOK=" + isOK);
      }) 
    });        

    
    n++;
    var et2 = "abc@b.c"; // good email    
    it(tag+': resetPasswordRequest.', function() {    
      return request(ES.app)
        .get('/api/resetPasswordRequest?emailAddress=' + et2) 
        .set('accept', 'application/json') 
        .expect(200) 
        .then(response => {  
          var eRes = response.body.emailAddress;   
          assert(et2==eRes," eRes=" + eRes);
          var isOK = response.body.isOK;   
          assert("YES"==isOK," isOK=" + isOK);
          var inDB = response.body.inDB;   
          assert("NO"==inDB," inDB=" + inDB);
      }) 
    });     
/*
    n++;
    var et3 = "q0@group6.io"; // good email,   inDB
    it(tag+': resetPasswordRequest.', function() {    
      return request(ES.app)
        .get('/api/resetPasswordRequest?emailAddress=' + et3) 
        .set('accept', 'application/json') 
        .expect(200) 
        .then(response => {  
          var eRes = response.body.emailAddress;   
          assert(et3==eRes," eRes=" + eRes);
          var isOK = response.body.isOK;   
          assert("YES"==isOK," isOK=" + isOK);
          var inDB = response.body.inDB;   
          assert("YES"==inDB," inDB=" + inDB);
      }) 
    });  
//*/   

// end ========================
});
