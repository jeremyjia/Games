const tag = "[t2.test.js_v0.21]";
const config = require('../config'); 
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
const request = require('supertest'); 
var assert = require('chai').assert; 
var testData = require('../auth/data/testData.js');
var ds = testData.getUserDatas(10); 

describe('auto test 2: NewPlayer and check duplicate player', function() { 
    var n = 0;
    for(i in ds){
      n++;
      it('Test 2.'+n+': register a new user.', function(_us,_i) {   
        return function(){   
            return request(ES.app)
              .post('/api/NewPlayer')
              .send(_us[_i])
              .set('accept', 'application/json')
              .set('Content-Type','application/json')
              .expect('Content-Type', /json/)
              .expect(200) 
              .then(response => {
                    console.log(tag + "****************** respoinse.body=", response.body);
                    var s = "";
                    s += 'response.body.code = ' + response.body.code; 
                    assert(response.body.code == 1, s );  
            })
          }
      }(ds,i));  
    }     
    
    for(i in ds){
      n++;
      it('Test 2.'+n+': check duplicate player.', function(_us,_i) {   
        return function(){   
            return request(ES.app)
              .post('/api/NewPlayer')
              .send(_us[_i])
              .set('accept', 'application/json')
              .set('Content-Type','application/json')
              .expect('Content-Type', /json/)
              .expect(200) 
              .then(response => {
                    console.log(tag + "****************** respoinse.body=", response.body);
                    var s = "";
                    s += 'response.body.code = ' + response.body.code; 
                    assert(response.body.code == 0, s );  
            })
          }
      }(ds,i));  
    }     
});