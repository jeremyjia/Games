const tag = "[t3.test.js_v0.25]";
const config = require('../config'); 
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
const request = require('supertest'); 
var assert = require('chai').assert; 
var testData = require('../auth/data/testData.js');
var ds = testData.getUserDatas(10); 
var ts = "auto test 3:";
ts += "login & getAllPlayers & getPendingFriends & getFriends";
ts += " & RequestToMakeFriend";
ts += " & ReponseToMakeFriend";
describe(ts, function() { 
    var token = "";
    var n = 1; 
    it('Test 3.'+n+': login.', function() {     
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

    n++;
    var resAllPlayers = null;
    it('Test 3.'+n+': getAllPlayers.', function() {    
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
          assert(response.body.n == ds.length,"n="+response.body.n); 
          for(i in ds){   
            assert("0.0.1"==resAllPlayers[i].Version, "Version = " + resAllPlayers[i].Version); 
            assert(""!=resAllPlayers[i].UserID, i + " UserID = " + resAllPlayers[i].UserID); 
            assert(ds[i].UserName==resAllPlayers[i].UserName, "UserName = " + resAllPlayers[i].UserName); 
            assert(n==i,"n=" + n);
            n++;
          }   
          assert(n==10,"n=" + n);
      }) 
    });     
    
    n++; 
    it('Test 3.'+n+': getPendingFriends.', function() {    
      return request(ES.app)
        .get('/api/getPendingFriends')
        .send(ds[1])
        .set('accept', 'application/json')
        .set('Authorization','Bearer ' + token) 
        .expect(200) 
        .then(response => {
          console.log(tag + "****************** token=", token);   
          console.log(tag + "****************** response.body=", response.body);     
          assert(response.body.code == 1, "response.body.code="+response.body.code)         
          assert(response.body.str.length == 0,"Should be empty.")
      }) 
    }); 

    n++;
    it('Test 3.'+n+': getFriends.', function() {    
      return request(ES.app)
        .get('/api/getFriends')
        .send(ds[1])
        .set('accept', 'application/json')
        .set('Authorization','Bearer ' + token) 
        .expect(200) 
        .then(response => {
          console.log(tag + "****************** token=", token);   
          console.log(tag + "****************** response.body=", response.body);     
          assert(response.body.code == 1, "response.body.code="+response.body.code)         
          assert(response.body.str == '[]',"Should be empty.")
      }) 
    }); 

    n++;
    var allPlayers = null;
    it('Test 3.'+n+': RequestToMakeFriend.', function() {     
          var o = {};
          o.FromID  = testData.getUserID("u1",allPlayers); 
          o.ToID    = testData.getUserID("u2",allPlayers);
          o.status  = "Unkown";
          return request(ES.app)
            .post('/api/RequestToMakeFriend')
            .send(o)
            .set('accept', 'application/json')
            .set('Content-Type','application/json') 
            .set('Authorization','Bearer ' + token) 
            .expect(200) 
            .then(response => {
                  console.log(tag + "****************** respoinse.body=", response.body); 
                  assert(response.body.code == 1,"RequestToMakeFriend error!");
          }) 
    });   

    n++; 
    var allPendingFriends = null;
    it('Test 3.'+n+': getPendingFriends.', function() {    
      return request(ES.app)
        .get('/api/getPendingFriends')
        .send(ds[1])
        .set('accept', 'application/json')
        .set('Authorization','Bearer ' + token) 
        .expect(200) 
        .then(response => {  
          //var s = "allPendingFriends= "+response.body.str;          eval(s);
          allPendingFriends = response.body.str;
          assert(response.body.code == 1, "allPendingFriends.RequestID = " + allPendingFriends.RequestID)         
           
      }) 
    }); 

   //*
    n++;
    it('Test 3.'+n+': ReponseToMakeFriend.', function() {     
          var o = {};
          o.FromID  = testData.getUserID("u1",allPlayers);  
          o.ToID    = testData.getUserID("u2",allPlayers);  
          o.ReqID   = testData.getReqID(o.FromID,o.ToID,allPendingFriends);
          o.status  = "Yes";
          return request(ES.app)
            .post('/api/ReponseToMakeFriend')
            .send(o)
            .set('accept', 'application/json')
            .set('Content-Type','application/json') 
            .set('Authorization','Bearer ' + token) 
            .expect(200) 
            .then(response => {
                  console.log(tag + "****************** respoinse.body=", response.body); 
          }) 
    });   
    //*/
        n++;
	it('Test 3.'+n+': getFriends.', function() {
            return request(ES.app)
             .get('/api/getFriends')
             .send(ds[1])
             .set('accept', 'application/json')
             .set('Authorization','Bearer ' + token)
             .expect(200)
             .then(response => {
                  console.log(tag + "****************** token=", token);
                  console.log(tag + "****************** response.body=", response.body);
                  assert(response.body.code == 1, "response.body.code="+response.body.code);
                  var s = "var ls="+response.body.str;
                  eval(s);
                  assert(ls[0].fromID == testData.getUserID("u1",allPlayers),"fromID="+ls[0].fromID);
            })
        });	
});
