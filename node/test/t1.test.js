const tag = "[t1.test.js_v0.21]";
const config = require('../config'); 
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);

const token = require('../auth/token');
const request = require('supertest'); 
var assert = require('chai').assert;
var testData = require('../auth/data/testData.js');


const authHeader = `Bearer: ${token.getTestToken()}`;
const ac  = '*/*'; 

const uAdmin = { AdminName:'admin',      Password:'admin', resCode: 1, msg:'OK!'};
const dReset =  [
    {
      "ID": 1,
      "sql": "Drop table group6User"
    }
]; 

describe('Unit Test 1: admin login', function() {   
  var token = "";
  it('Test 1.1: [/api/adminSignIn] (uAdmin)', function() {
        return request(ES.app) 
          .post('/api/adminSignIn')
          .send(uAdmin) 
          .set('accept', ac)
          .set('Content-Type','application/json') 
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
                console.log(tag + " respoinse.body=" + response.body.msg);
                var s = "";
                s += 'response.body.code = ' + response.body.code;
                s += '; uAdmin.resCode = '+ uAdmin.resCode;
                token = response.body.token;
                assert(response.body.code == uAdmin.resCode, s);
                assert(response.body.msg == uAdmin.msg, "msg!="+uAdmin.msg);
                assert(s.length > 11 , "token = " + token);
        })
  });    
  /*
  it('Test 1.2: [/api/reset] (uAdmin)', function() {
        return request(ES.app) 
          .post('/api/reset')
          //.send(testData.reqReset_create_tables) 
          .send(testData.reqReset_drop_tables) 
          .set('accept', ac)
          .set('Authorization', 'Bearer ' + token)
          .set('Content-Type', 'application/json') 
          .expect(200)
          .expect('Content-Type', /json/)
          .then(response => {
                console.log(tag + " respoinse.body=", response.body);
                var s = "";
                s += 'response.body.code = ' + testData.resReset.code; 
                assert(response.body.code == testData.resReset.code, s + " : testData.v="+ testData.v); 
                assert(response.body.n == 3, s + " ..."); 
                //assert(response.body.ls == "ls", s + " ls check error."); 
        })
  });  
  //*/
  /*
  it('Test 1.3: [/api/reset] (uAdmin)', function() {
    return request(ES.app) 
      .post('/api/reset')
      .send(testData.reqReset_create_tables)  
      .set('accept', ac)
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json') 
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
            console.log(tag + " respoinse.body=", response.body);
            var s = "";
            s += 'response.body.code = ' + testData.resReset.code; 
            assert(response.body.code == testData.resReset.code, s + " : testData.v="+ testData.v); 
            assert(response.body.n == 3, s + " ..."); 
            //assert(response.body.ls == "ls", s + " ls check error."); 
    })
});  
//*/

});
