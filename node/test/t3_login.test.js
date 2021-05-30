const tag = "[t3_login.test.js_v0.23]";
const config = require('../config');
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.HOST_PORT, config.OPENAPI_YAML);
const request = require('supertest');
var assert = require('chai').assert;
var testData = require('../auth/data/testData.js');
var ds = testData.getUserDatas(10);
var ts = "auto test 3:"; 

describe(ts, function() { 
    var n = 1;
    var u2Test = ds[2];
    it(ts+n+': login.', function() {
          return request(ES.app)
            .post('/api/login')
            .send(u2Test)
            .set('accept', 'application/json')
            .set('Content-Type','application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                  console.log(tag + "****************** respoinse.body=", response.body);
                  var s = "response.body.UserName = " + response.body.UserName;
                  assert(response.body.UserName == u2Test.UserName, s );
                  assert(response.body.code == 1, s );                  
          })
    }); 

});
