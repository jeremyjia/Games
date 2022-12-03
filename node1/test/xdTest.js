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
        var testMe = JSON.stringify(response.body); 
        assert("{}"==testMe,"testMe=" + testMe); 
    }) 
  });    

  it('xd dev', function(){ 
    assert.equal(app(),'to test xdApp: done.');
  });
  
  it('word', function(){     assert.equal("done",'done');  });
  it('abc0', function(){     assert.equal("done",'done');  });
  it('blscript editor', function(){     assert.equal("done",'doing');  });
  
});