const tag = "[t9_Friends_Endpoints.test.js_v0.33*]";
const config = require('../config');
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.HOST_PORT, config.OPENAPI_YAML);
const request = require('supertest');
var assert = require('chai').assert;
var testData = require('../auth/data/testData.js');
var ds = testData.getUserDatas(10); 

describe(tag, function() { 
      var token = "";
      var n = 1;
      var u2Test = ds[2];
     
      it(tag + n + ': login.', function() {
            return request(ES.app)
                  .post('/api/login')
                  .send(u2Test)
                  .set('accept', 'application/json')
                  .set('Content-Type','application/json')
                  .expect('Content-Type', /json/)
                  .expect(200)
                  .then(response => {
                        console.log(tag + "****************** respoinse.body=", response.body);
                        var s = "response.body.userName = " + response.body.userName;
                        assert(response.body.userName == u2Test.UserName, s );
                        assert(response.body.code == 1, s );   
                        token = response.body.token;               
            })
      }); 
 
 
      n++;
  	it(tag + n + ': getPendingFriends.', function() {
            return request(ES.app)
             .get('/api/getPendingFriends') 
             .set('accept', 'application/json')
             .set('Authorization','Bearer ' + token)
             .expect(200)
             .then(response => {      
                  console.log(tag + "****************** response.body=", response.body);                 
                  var o = response.body;  
                  assert(0 == o.str.length,"l=" + o.str.length);   
                  assert(1 == o.code," code =" + o.code);   
            })
      });	  

      n++;
      var resAllPlayers = null;
      it(tag + n + ': getAllPlayers.', function() {
        return request(ES.app)
          .get('/api/getAllPlayers')
          .send(ds[1])
          .set('accept', 'application/json')
          .set('Authorization','Bearer ' + token)
          .expect(200)
          .then(response => {            
            resAllPlayers = response.body.str;
            console.log(tag + "xd3: ****************** resAllPlayers=", resAllPlayers);
            var n = 0;
            assert(response.body.code == 1, "response.body.code="+response.body.code);
            assert(response.body.n == testData.nTest1,"n="+response.body.n);
            for(var i=0;i<testData.nTest1;i++){
              assert("0.0.1"==resAllPlayers[i].Version, "Version = " + resAllPlayers[i].Version);
              assert(""!=resAllPlayers[i].UserID, i + " UserID = " + resAllPlayers[i].UserID);
              assert(ds[i].UserName==resAllPlayers[i].UserName, "UserName = " + resAllPlayers[i].UserName);
              assert(n==i,"n=" + n);
              assert("No"==resAllPlayers[i].AgreeTerms,"AgreeTerms error! AgreeTerms = " + resAllPlayers[i].AgreeTerms);
              n++;
            }
            assert(n==testData.nTest1,"n=" + n);
        })
      });
  

    n++;
    it(tag + n + ': getPendingFriends.', function() {
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
    it(tag + n + ': getFriends.', function() {
      return request(ES.app)
        .get('/api/getFriends') 
        .set('accept', 'application/json')
        .set('Authorization','Bearer ' + token)
        .expect(200)
        .then(response => { 
          assert(response.body.code == 1, "response.body.code=" + response.body.code); 
          assert(response.body.str.length == 0,"Should be empty.")
      })
    }); 

    n++;    
    it(tag + n + ': RequestToMakeFriend.', function() {
          var o = {};
          o.FromID  = resAllPlayers[0].UserID;
          o.ToID    = resAllPlayers[1].UserID;
          o.status  = "Unknown";
          return request(ES.app)
            .post('/api/RequestToMakeFriend')
            .send(o)
            .set('accept', 'application/json')
            .set('Content-Type','application/json')
            .set('Authorization','Bearer ' + token)
            .expect(200)
            .then(response => {
                  console.log(tag + "****************** respoinse.body=", response.body);
                  assert(response.body.code == 1,"response.body.code=" + response.body.code);
                  assert(response.body.data != null,"data="+ JSON.stringify(response.body.data));

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
          allPendingFriends = response.body.str;
          assert(response.body.code == 1, "allPendingFriends.RequestID = " + allPendingFriends.RequestID);
          assert(resAllPlayers[0].UserID == allPendingFriends[0].FromID, "allPendingFriends[0].FromID = " + allPendingFriends[0].FromID);
          assert(resAllPlayers[1].UserID == allPendingFriends[0].ToID, "allPendingFriends[0].FromID = " + allPendingFriends[0].FromID);
          assert(null != allPendingFriends[0].RequestID, "allPendingFriends[0].ReqID = " + allPendingFriends[0].RequestID);
          assert("Unknown" == allPendingFriends[0].status, "allPendingFriends[0].status = " + allPendingFriends[0].status);
          
          assert(1 == response.body.str.length,"l=" + response.body.str.length);   

      })
    });

    n++;    
    it(tag + n + ': ReponseToMakeFriend.', function() {
          var o = {};
          o.ReqID  = allPendingFriends[0].RequestID;
          o.FromID  = allPendingFriends[0].FromID;
          o.ToID    = allPendingFriends[0].ToID;
          o.status  = "Yes";
          return request(ES.app)
            .post('/api/ReponseToMakeFriend')
            .send(o)
            .set('accept', 'application/json')
            .set('Content-Type','application/json')
            .set('Authorization','Bearer ' + token)
            .expect(200)
            .then(response => {                  
                  assert(response.body.code == 1,"response.body.code=" + response.body.code + ":message=" + + response.body.message);
                  assert(response.body.ReqID == o.ReqID,"ReqID=="+response.body.ReqID);
                  assert(response.body.FromID == o.FromID,"FromID=="+response.body.FromID);
                  assert(response.body.ToID == o.ToID,"ToID=="+response.body.ToID);
                  
            })
    });

    n++;
    it(tag + n + ': getFriends.', function() {
      return request(ES.app)
        .get('/api/getFriends') 
        .set('accept', 'application/json')
        .set('Authorization','Bearer ' + token)
        .expect(200)
        .then(response => { 
          assert(response.body.code == 1, "response.body.code=" + response.body.code); 
          assert(response.body.str.length == 1,"response.body.str.length =" + response.body.str.length);
          assert(response.body.str[0].FromID == allPendingFriends[0].FromID,"FromID=="+response.body.str[0].FromID);
          assert(response.body.str[0].ToID == allPendingFriends[0].ToID,"ToID=="+response.body.str[0].ToID);
          assert(response.body.str[0].status == "Yes","status=="+response.body.str[0].status);
          assert(response.body.str[0].RequestID == allPendingFriends[0].RequestID,"RequestID=="+response.body.str[0].RequestID);
      })
    }); 



});
