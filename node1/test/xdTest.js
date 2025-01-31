const tag4xdTest = "xdTest.js_v0.23";
const assert = require('chai').assert;
const config = require('../config');
const ExpressServer = require('../expressServer');
const ES = new ExpressServer(config.HOST_PORT, config.OPENAPI_YAML);
const request = require('supertest');
const app = require('../app/xd.js');
const spiderTest = require('./spider/index.js');


describe(tag4xdTest, function(){ 
  
  //
  it('2025/2/1: bls editor can play bls at right FPS;' + `
    test->https://littleflute.github.io/Games/issues/21/index.html;
    `,
    function(){assert.equal("done",'2do');  });

  it('2024/10/27: [mp3lrc2bls]  node1 end point;' + `
    test->http://localhost:3001/mp3lrc2bls?mp3=https://littleflute.github.io/blcd10/share152/Track%2001.mp3&lrc=https://littleflute.github.io/51voa/special/2021/11/20/anymore-any-longer-and-no-longer.lrc&bls=v1;
    test->http://localhost:8080/image/json2video?script=http://localhost:3001/v1.json;
    test->http://localhost:3001/bls2v?bls=http://localhost:3001/v1.json;
    `,
    function(){assert.equal("done",'2do');  });
  
  it('2024/10/26: [bls2v]  node1 end point;' + `
    test->http://localhost:3001/bls2v?bls=http://localhost:3001/v1.json;
    test->http://localhost:3001/bls2v?bls=http://localhost:8080/video.json;
    `,
    function(){assert.equal("done",'2do');  });

  it('2024/10/9 : [mp3lrc2bls]  node1 end point;' + `
    test->http://localhost:3001/mp3lrc2bls?mp3=https://files.21voa.com/audio/202410/two-americans-win-nobel-prize-in-medicine-for-microrna-discovery.mp3&lrc=/static/lrc/two-americans-win-nobel-prize-in-medicine-for-microrna-discovery.lrc&bls=test1;
    test->http://localhost:3001/spider/21voa;
    `,
    function(){assert.equal("done",'done');  });

  it('2024/10/7 : [mp3lrc2bls]  node1 end point;' + `
    test->http://localhost:3001/mp3lrc2bls;
    test->http://localhost:8080/image/json2video?script=http://localhost:3001/v1.json;
    `,
    function(){assert.equal("done",'done');  });
  it('2024/10/7 : [Sprint\bat\r.bat];' + `
    test->cmd r;
    `,
    function(){assert.equal("done",'done');  });

  it('2024/10/7 : [links]  node1 end point;' + `
    test->http://localhost:3001/links?url=https://www.21voa.com/;
    test->http://localhost:3001/links?url=https://www.21voa.com/&file=lrc;
    test->http://localhost:3001/links?url=https://www.21voa.com/&file=lrc&times=1;
    `,
    function(){assert.equal("done",'done');  });

  it('2024/10/6 : plx_p1; test:Spring/script/1.html; test->http://localhost:8080/',
    function(){assert.equal("done",'done');  });

  it('2024/10/6 : issues/252 test fail;',
    function(){assert.equal("done",'done');  });

  it('2024/10/4 : 21voa; test->issues/455/index.html ',
     function(){assert.equal("done",'done');  });

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

    9分！封杀26年回归，震撼到失语，真是最伟大的禁片…
    https://mp.weixin.qq.com/s/84W1DtsTRBBZGh87uTsGLw

    https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
    https://littleflute.github.io/Games/issues/21/touch.html
     
    
    https://littleflute.github.io/Games/issues/21/testC4AutoRun.html
    
    https://littleflute.github.io/Games/issues/21/testC4Canvas.html
    https://mp.weixin.qq.com/s/IDtlkjfAIWF-471Wrem42A

    `;
    const doing =`...`;
    assert.equal(doing,doing);
  });

  it('superObject', function(){ 
    var done =`
    1. load a picture from TA.
    2. blWrapCVS
    3. play superObjects when play blscript.
    `;    
    const doing =`...`;
    assert.equal(done,done);
  });
  
  it('music', function(){
    var done =`
    1. i21/draw.html
    `;    
    const doing =`...`;
    assert.equal(done,done);
  });
  it('word', function(){assert.equal("done",'done');  });
  it('abc0', function(){assert.equal("done",'done');  });
  it('back door to edit current frame', function(){assert.equal("done",
    'done');  });
  it('https://littleflute.github.io/Games/issues/21/testC4AutoRun.html',function(){assert.equal("done",'done');}); 
  it('https://littleflute.github.io/Games/issues/21/testC4Canvas.html', function(){assert.equal("done",'done');});
  it('https://nodejs.dovov.com/node-js-msgwindows-api.html', function(){assert.equal("2do",'2do');  }); 
  it('1128', function(){assert.equal("done",'done');  });
  
});
