const tag = "[t8_setIcon.test.js v0.22*] ";
const config = require('../config'); 
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.HOST_PORT, config.OPENAPI_YAML);
const request = require('supertest'); 
var assert = require('chai').assert; 
var testData = require('../auth/data/testData.js');
var ds = testData.getUserDatas(10);  
var iTest = 0;
var ts = tag;
ts += "login & setIcon ";

describe(ts, function() { 
    var token = "";
    var n = 1; 
    it(tag+n+': login.', function() {     
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
 
    const testIconID = 15;
    var resAllPlayers = null;
    it(tag+': getAllPlayers.', function() {    
      return request(ES.app)
        .get('/api/getAllPlayers')
        .send(ds[1])
        .set('accept', 'application/json')
        .set('Authorization','Bearer ' + token) 
        .expect(200) 
        .then(response => {  
          //var s = "allPlayers= " + response.body.str;          eval(s);
          resAllPlayers = response.body.str;
          console.log(tag + "xd3: ****************** resAllPlayers=", resAllPlayers);    
          var n = 0;
          assert(response.body.code == 1, "response.body.code="+response.body.code);
          assert(response.body.n == testData.nTest1,"n="+response.body.n); 
          for(var i = 0; i < testData.nTest1; i++ ){   
            assert("0.0.1"==resAllPlayers[i].Version, "Version = " + resAllPlayers[i].Version); 
            assert(""!=resAllPlayers[i].UserID, i + " UserID = " + resAllPlayers[i].UserID); 
            assert(ds[i].UserName==resAllPlayers[i].UserName, "UserName = " + resAllPlayers[i].UserName); 
            assert(n==i,"n=" + n);
            n++;
          }   
          assert(n==testData.nTest1,"n=" + n);
      }) 
    });     
    

    it(tag + ' setIcon.', function() {     
      var o = {};
      o.UserID  = resAllPlayers[iTest].UserID;
      o.IconID = testIconID;

      return request(ES.app)
        .post('/api/setIcon')
        .send(o)
        .set('accept', 'application/json')
        .set('Content-Type','application/json') 
        .set('Authorization','Bearer ' + token) 
        .expect(200) 
        .then(response => { 
              assert(1==response.body.code,"response.body.code="+response.body.code);
              assert(o.IconID==response.body.IconID,"response.body.IconID="+response.body.IconID);
      }) 
    });   
  
  	it(tag +': getPlayer.', function() {
      return request(ES.app)
       .get('/api/getPlayer?id='+resAllPlayers[iTest].UserID) 
       .set('accept', 'application/json')
       .set('Authorization','Bearer ' + token)
       .expect(200)
       .then(response => {      
            console.log(tag + "****************** response.body=", response.body);                 
            var r= response.body; 
            var t = null;//testIconID;               
            assert(r[0].IconID == t,"r.IconID="+r[0].IconID);
      })
    });	 
});
