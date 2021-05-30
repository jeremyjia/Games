const tag = "[t1_admin.test.js_v0.31]";
const config = require('../config'); 
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.HOST_PORT, config.OPENAPI_YAML);
 
const request = require('supertest'); 
var assert = require('chai').assert; 
 
const ac  = '*/*'; 

const uAdmin = { AdminName:'admin',      Password:'admin', resCode: 1, msg:'OK!'};
 

describe(tag + ' : admin login & reset', function() {   
  var token = "";
  it(tag + ': [/api/adminSignIn]', function() {
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
 
  var data2Test1 = [
      {
        "ID": 1,
        "sql": "Drop table group6User"
      }
  ];
  it('Test 1.2: [/api/reset] ', function() {
        return request(ES.app) 
          .post('/api/reset') 
          .send(data2Test1) 
          .set('accept', ac)
          .set('Authorization', 'Bearer ' + token)
          .set('Content-Type', 'application/json') 
          .expect(200)
          .expect('Content-Type', /json/)
          .then(response => {
                console.log(tag + " respoinse.body=", response.body);
                var s = "";
                s += 'response.body.code = ' + response.body.code; 
                assert(response.body.code == 1, s); 
                assert(response.body.n == 4, s + " ..."); 
                assert(response.body.ID == 1, "response.body.ID =" + response.body.ID);                 
          })
  });    

  var data2Test2 = [
      {
        "ID": 2,
        "sql": "Drop table group6User"
      }
  ];
  it('Test 1.3: [/api/reset] ', function() {
        return request(ES.app) 
          .post('/api/reset') 
          .send(data2Test2) 
          .set('accept', ac)
          .set('Authorization', 'Bearer ' + token)
          .set('Content-Type', 'application/json') 
          .expect(200)
          .expect('Content-Type', /json/)
          .then(response => {
                console.log(tag + " respoinse.body=", response.body);
                var s = "";
                s += 'response.body.code = ' + response.body.code; 
                assert(response.body.code == 1, s); 
                assert(response.body.n == 4, s + " ..."); 
                assert(response.body.ID == 2, "response.body.ID =" + response.body.ID);                 
          })
  });    

});
