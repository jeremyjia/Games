const tag = "[t2.register.test.js_v0.34]";
const config = require('../config'); 
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.HOST_PORT, config.OPENAPI_YAML);
const request = require('supertest'); 
var assert = require('chai').assert; 
const hash = require('../utils/hash'); 

var testData = require('../auth/data/testData.js');
var ds = testData.getUserDatas(10);  
describe('auto test 2: NewPlayer and check duplicate player', function() { 
    var n = 0;
    var i = 0;
    do{
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
                    s += ' info=' + response.body.info;
                    s += " UserName=" +  _us[_i].UserName;
                    assert(response.body.code == 1, s  );  
                    
                    var h = response.body.hash;    
                    var s = "";
                    s += _us[_i].Password + "'hash=" + h;

                    var b = hash.toCompare(_us[_i].Password,h);

                    assert(true == b, s);  
              })
          }
      }(ds,i));  
      i++;
    }while(i<testData.nTest1);     
    
    i = 0;
    do{
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
                    assert(response.body.code == -1, s );  
            })
          }
      }(ds,i));  
      i++;
    }while(i<testData.nTest1);    
    
    
    i = 0;
    do{
      n++;
      it('Test 2.'+n+': check duplicate email test.', function(_us,_i) {   
        return function(){   
            _us[_i].UserName = "u4EmailTest-"+_i;
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
                    assert(response.body.code == -2, s );  
            })
          }
      }(ds,i));  
      i++;
    }while(i<testData.nTest1);    
    
     
    n++;
    var u4EmailTest = ds[6];    
    u4EmailTest.EmailAddress = "q2@group6.io"; 
    it('Test 2.'+n+': check duplicate email test: ' + u4EmailTest.EmailAddress, function() {   
      return function(){   
          return request(ES.app)
            .post('/api/NewPlayer')
            .send(u4EmailTest)
            .set('accept', 'application/json')
            .set('Content-Type','application/json')
            .expect('Content-Type', /json/)
            .expect(200) 
            .then(response => {
                  console.log(tag + "u4EmailTest ****************** respoinse.body=", response.body);
                  var s = "";
                  s += 'response.body.code = ' + response.body.code; 
                  assert(response.body.code == -2, s );  
          })
        }
    }()); 

    
    n++;
    var userName2Test = "q1";    
    it('Test 2.'+n+': checkUserName end point test (q1 should be existed.)', function() {   
      return function(){   
          return request(ES.app)
            .get('/api/checkUserName?UserName='+userName2Test)   
            .expect('Content-Type', /json/)
            .expect(200) 
            .then(response => {
                  console.log(tag + "respoinse.body=", response.body);
                  var s = "";
                  s += 'response.body.code = ' + response.body.code; 
                  assert(response.body.code == 1, s );  
          })
        }
    }()); 
    
    n++;
    var un2 = "u11";    
    it('Test 2.'+n+': checkUserName end point test', function() {   
      return function(){   
          return request(ES.app)
            .get('/api/checkUserName?UserName='+un2)   
            .expect('Content-Type', /json/)
            .expect(200) 
            .then(response => {
                  console.log(tag + "respoinse.body=", response.body);
                  var s = "";
                  s += 'response.body.code = ' + response.body.code; 
                  s += ' un2=' + un2;
                  assert(response.body.code == 0, s );  
          })
        }
    }());  

    n++;
    var email1 = "email1@group6.io";    
    it('Test 2.'+n+': checkEmailAddress end point test', function() {   
      return function(){   
          return request(ES.app)
            .get('/api/checkEmailAddress?EmailAddress='+email1)   
            .expect('Content-Type', /json/)
            .expect(200) 
            .then(response => {
                  console.log(tag + "respoinse.body=", response.body);
                  var s = "";
                  s += 'response.body.code = ' + response.body.code; 
                  s += ' email1='+email1;
                  assert(response.body.code == 0, s );  
          })
        }
    }()); 
    
    n++;
    var email2 = "q1@group6.io";    
    it('Test 2.'+n+': checkEmailAddress end point test: ' + email2, function() {   
      return function(){   
          return request(ES.app)
            .get('/api/checkEmailAddress?EmailAddress='+email2)   
            .expect('Content-Type', /json/)
            .expect(200) 
            .then(response => {
                  console.log(tag + "respoinse.body=", response.body);
                  var s = "";
                  s += 'response.body.code = ' + response.body.code; 
                  s += ' email2='+email2;
                  assert(response.body.code == 1, s );  
          })
        }
    }()); 
    
});