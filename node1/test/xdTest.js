const tag4xdTest = "xdTest.js_v0.13";
const assert = require('chai').assert;
const config = require('../config');
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.HOST_PORT, config.OPENAPI_YAML);
const request = require('supertest');
const app = require('../app/xd.js');
const spiderTest = require('./spider/index.js');


describe(tag4xdTest, function(){ 
  
  it('spiderTest: test1', function(){     
    spiderTest.test1(assert);   
  });

  
  it('endpointTest: [/spider]', function() {    
    return request(ES.app)
      .get('/spider')
      .send()
      .set('accept', 'application/json') 
      .expect(200) 
      .then(response => {   
        var testMe = response.body.api; 
        assert("spider"==testMe,"testMe=" + testMe);
        var Classnum = response.body.Classnum; 
        assert(1==Classnum,"Classnum=" + Classnum);

    }) 
  });    

  it('xd dev', function(){ 
    assert.equal(app(),'to test xdApp: done.voa2json');
  });
});