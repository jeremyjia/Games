const tag = "[t4_ci.test.js _v0.25] ";
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

    n++;
    var resAllPlayers = null;
    it(tag +n+': getAllPlayers.', function() {    
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
          assert(n==11,"n=" + n);
      }) 
    });     
       
});
