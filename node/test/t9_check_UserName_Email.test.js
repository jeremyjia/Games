const tag = "[t9_check_Username_Email.test.js v0.24] ";
const config = require('../config'); 
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.HOST_PORT, config.OPENAPI_YAML);
const request = require('supertest'); 
var assert = require('chai').assert; 
var testData = require('../auth/data/testData.js');
const { pw } = require('../config');
var ds = testData.getUserDatas(10);  
var iTest = 1;
var ts = tag;

describe(ts, function() {       
  
  	it(tag +': checkUserName.', function() {
       var userName = "q0";
       return request(ES.app)
       .get('/api/checkUserName?UserName=' + userName) 
       .set('accept', 'application/json') 
       .expect(200)
       .then(response => {      
            console.log(tag + "****************** response.body=", response.body);                 
            var o = response.body;                 
            var code = o.code;                  
            var info = o.info; 
            
            assert(1 == code," code=" + code);      
            assert("duplicated name." == info," info=" + info);              
      })
    });	 

    
  
  	it(tag +': checkUserName.', function() {
        var userName = "u100";
        return request(ES.app)
         .get('/api/checkUserName?UserName=' + userName) 
         .set('accept', 'application/json') 
         .expect(200)
         .then(response => {      
              console.log(tag + "****************** response.body=", response.body);                 
              var o = response.body;                 
              var code = o.code;                  
              var info = o.info; 
              
              assert(0 == code," code=" + code);     
              assert(userName + " can be used to register." == info," info=" + info);   
              
        })
    });	 

    
  	it(tag +': checkEmailAddress.', function() {
        var EmailAddress = "q0@group6.io";
        return request(ES.app)
        .get('/api/checkEmailAddress?EmailAddress=' + EmailAddress) 
        .set('accept', 'application/json') 
        .expect(200)
        .then(response => {      
             console.log(tag + "****************** response.body=", response.body);                 
             var o = response.body;                 
             var code = o.code;                  
             var info = o.info; 
             
             assert(1 == code," code=" + code);      
             assert("duplicated email." == info," info=" + info);              
       })
     });	     

     it(tag +': checkEmailAddress.', function() {
        var EmailAddress = "u110@group6.io";
        return request(ES.app)
        .get('/api/checkEmailAddress?EmailAddress=' + EmailAddress) 
        .set('accept', 'application/json') 
        .expect(200)
        .then(response => {      
             console.log(tag + "****************** response.body=", response.body);                 
             var o = response.body;                 
             var code = o.code;                  
             var info = o.info; 
             
             assert(0 == code," code=" + code);      
             assert(EmailAddress + " can be used to register." == info," info=" + info);              
       })
     });	     

});
