const tag = "[t2_login.test.js _v0.32] ";
const config = require('../config'); 
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
const request = require('supertest'); 
var assert = require('chai').assert; 
var testData = require('../auth/data/testData.js');
var ds = testData.getUserDatas(10); 
var ts = "auto test 4:"; 

describe(ts, function() { 
    var token = "";
    var n = 1; 
    it(tag+n+': login.', function() {     
          return request(ES.app)
            .post('/api/login')
            .send(ds[1])
            .set('accept', 'application/json')
            .set('Content-Type','application/json')
            .expect('Content-Type', /json/)
            .expect(200) 
            .then(response => {
                  console.log(tag + "****************** respoinse.body=", response.body);
                  var s = "";
                  s += 'response.body.code = ' + response.body.code; 
                  token = response.body.token;
                  assert(response.body.code == 1, s );  
          }) 
    });   
 
});
