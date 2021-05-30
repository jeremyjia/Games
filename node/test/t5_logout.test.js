const tag = "[t5_logout.test.js v0.44] ";
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
    var token = "";
    var step = 1; 
    it(tag+step+': login.', function() {     
          return request(ES.app)
            .post('/api/login')
            .send(ds[iTest])
            .set('accept', 'application/json')
            .set('Content-Type','application/json')
            .expect('Content-Type', /json/)
            .expect(200) 
            .then(response => {
                  console.log(tag + "****************** response.body=", response.body);
                  var s = "";
                  s += 'response.body.code = ' + response.body.code; 
                  token = response.body.token;
                  s += ' token = ' + token;
                  assert(response.body.code == 1, s );   
          }) 
    });  

    step++;
    var resAllPlayers = null;
    it(tag+step+': getAllPlayers.', function() {    
      return request(ES.app)
        .get('/api/getAllPlayers') 
        .set('accept', 'application/json')
        .set('Authorization','Bearer ' + token) 
        .expect(200) 
        .then(response => {   
          resAllPlayers = response.body.str;
          console.log(tag + "xd3: ****************** resAllPlayers=", resAllPlayers);    
          var n = 0;
          assert(response.body.code == 1, "response.body.code="+response.body.code);
          assert(response.body.n == testData.nTest1,"n="+response.body.n); 
          for(var i = 0; i < testData.nTest1; i++){   
            assert("0.0.1"==resAllPlayers[i].Version, "Version = " + resAllPlayers[i].Version); 
            assert(""!=resAllPlayers[i].UserID, i + " UserID = " + resAllPlayers[i].UserID); 
            assert(ds[i].UserName==resAllPlayers[i].UserName, "UserName = " + resAllPlayers[i].UserName); 
            assert(n==i,"n=" + n);
            n++;
          }   
          assert(n==testData.nTest1,"n=" + n); 
      }) 
    });     

    /*
    step++;
  	it(tag + step + ': getPlayer.', function() {
      return request(ES.app)
       .get('/api/getPlayer?id='+resAllPlayers[iTest].UserID) 
       .set('accept', 'application/json')
       .set('Authorization','Bearer ' + token)
       .expect(200)
       .then(response => {      
            console.log(tag + "****************** response.body=", response.body);                 
            var o = response.body;                 
            var v = o[0].Version; 
            assert("0.0.12" == v,"v=" + v);   
      })
    });	 
    //*/
 
    step++;    
    it(tag+step+': logout.', function() {     
      return request(ES.app)
        .post('/api/logout')
        .send(ds[iTest])
        .set('accept', 'application/json')
        .set('Content-Type','application/json')
        .set('Authorization','Bearer ' + token) 
        .expect('Content-Type', /json/)
        .expect(200) 
        .then(response => {
              var s = "";
              s += 'response.body.code = ' + response.body.code;  
              s += ' token = ' + token;
              assert(response.body.code == 1, s );  
              assert(token==response.body.token,"token="+token); 
      }) 
    });  
  
    step++;
    var resAllPlayers = null;
    it(tag+step+': getAllPlayers.', function() {    
      return request(ES.app)
        .get('/api/getAllPlayers') 
        .set('accept', 'application/json')
        .set('Authorization','Bearer ' + token) 
        .expect(403)          
    });     
    
 
    step++;
    it(tag+step+': login.', function() {     
      return request(ES.app)
        .post('/api/login')
        .send(ds[iTest])
        .set('accept', 'application/json')
        .set('Content-Type','application/json')
        .expect('Content-Type', /json/)
        .expect(200) 
        .then(response => {
              console.log(tag + "****************** response.body=", response.body);
              var s = "";
              s += 'response.body.code = ' + response.body.code; 
              token = response.body.token;
              s += ' token = ' + token;
              assert(response.body.code == 1, s );   
      }) 
    });  
     
    step++;
    var resAllPlayers = null;
    it(tag+step+': getAllPlayers.', function() {    
      return request(ES.app)
        .get('/api/getAllPlayers') 
        .set('accept', 'application/json')
        .set('Authorization','Bearer ' + token) 
        .expect(200) 
        .then(response => {   
          resAllPlayers = response.body.str;
          console.log(tag + "xd3: ****************** resAllPlayers=", resAllPlayers);    
          var n = 0;
          assert(response.body.code == 1, "response.body.code="+response.body.code);
          assert(response.body.n == testData.nTest1,"n="+response.body.n); 
          for(var i =0; i < testData.nTest1;i++){   
            assert("0.0.1"==resAllPlayers[i].Version, "Version = " + resAllPlayers[i].Version); 
            assert(""!=resAllPlayers[i].UserID, i + " UserID = " + resAllPlayers[i].UserID); 
            assert(ds[i].UserName==resAllPlayers[i].UserName, "UserName = " + resAllPlayers[i].UserName); 
            assert(n==i,"n=" + n);
            n++;
          }   
          assert(n==testData.nTest1,"n=" + n); 
      }) 
    });     
});
