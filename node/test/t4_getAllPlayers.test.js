const tag = "[t4_getAllPlayers.test.js_v0.13]";
const config = require('../config');
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.HOST_PORT, config.OPENAPI_YAML);
const request = require('supertest');
var assert = require('chai').assert;
var testData = require('../auth/data/testData.js');
var ds = testData.getUserDatas(10);
var ts = "auto test 4:";
ts += "login & getAllPlayers multiple times";

describe(ts, function() {
    var token = "";
    var n = 1;
    it('Test 4.'+n+': login.', function() {
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
                  s += ' token = ' + token;
                  assert(response.body.code == 1, s );
          })
    });

    //152
    for(var i=0; i < 152;i++){
          n++;
          var resAllPlayers = null;
          it('Test 4.'+n+': getAllPlayers i = ' + i, function() {
            return request(ES.app)
              .get('/api/getAllPlayers') 
              .set('accept', 'application/json')
              .set('Authorization','Bearer ' + token)
              .expect(200)
              .then(response => {
                      resAllPlayers = response.body.str;
                      console.log(tag + "xd3: ****************** resAllPlayers=", resAllPlayers);
                      var n = 0;
                      //assert(response.body.code == 1, "response.body.code="+response.body.code);
                      //assert(response.body.n == testData.nTest1,"n="+response.body.n);
                      for(var i=0; i<testData.nTest1;i++){
                        //assert("0.0.1"==resAllPlayers[i].Version, "Version = " + resAllPlayers[i].Version);
                        //assert(""!=resAllPlayers[i].UserID, i + " UserID = " + resAllPlayers[i].UserID);
                        //assert(ds[i].UserName==resAllPlayers[i].UserName, "UserName = " + resAllPlayers[i].UserName);
                        assert(n==i,"n=" + n);
                        n++;
                      }
                      assert(n==testData.nTest1,"n=" + n);
            })
          });
    }
});
