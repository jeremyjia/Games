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

  it('wechat', function(){ 
    var done ="";    

    done += ` 
    https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
    https://littleflute.github.io/Games/issues/21/touch.html
     
    
    https://littleflute.github.io/Games/issues/21/testC4AutoRun.html
    
    https://littleflute.github.io/Games/issues/21/testC4Canvas.html
    https://mp.weixin.qq.com/s/IDtlkjfAIWF-471Wrem42A

    `;
    const doing =`...`;
    assert.equal(done,doing);
  });

  it('xd dev', function(){ 
    assert.equal(app(),'to test xdApp: done.');
  });
  
  it('word', function(){assert.equal("done",'done');  });
  it('abc0', function(){assert.equal("done",'done');  });
  it('blscript editor', function(){assert.equal("done",'done');  });
  it('https://littleflute.github.io/Games/issues/21/testC4AutoRun.html',function(){assert.equal("done",'done');}); 
  it('https://littleflute.github.io/Games/issues/21/testC4Canvas.html', function(){assert.equal("done",'done');});
  it('https://nodejs.dovov.com/node-js-msgwindows-api.html', function(){assert.equal("done",'2do');  }); 
  
});