const tag = "[t7_toResetPassword.test.js v0.21] ";
const config = require('../config'); 
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.HOST_PORT, config.OPENAPI_YAML);
const request = require('supertest'); 
var assert = require('chai').assert; 

var ts = tag;

describe(ts, function() { 

    var n = 0;          
    n++;
    var c1 = "abc"; // bad code  
    var npw = "abc";
    var url = '/api/toResetPassword?code=' + c1;
    url += '&newPW=' + npw;  
    it(tag+': toResetPassword.', function() {    
      return request(ES.app)
        .get(url) 
        .set('accept', 'application/json') 
        .expect(200) 
        .then(response => {  
            var code = response.body.code;   
            assert(c1==code," code=" + code);  
            var codeInDB = response.body.codeInDB;   
            assert("NO"==codeInDB," codeInDB=" + codeInDB); 
      });     
    });   
  
// end ========================
});
