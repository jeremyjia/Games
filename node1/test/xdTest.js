const assert = require('chai').assert;
const express = require('express')
const ESv = express()
const request = require('supertest');
const app = require('../app/xd.js');
const spiderTest = require('./spider/index.js');

describe('xdApp', function(){ 
  
  it('spiderTest: test1', function(){     
    spiderTest.test1(assert);   
  });

  
  it('endpoint test.', function() {    
    return request(ESv)
      .get('/spider')
      .send()
      .set('accept', 'application/json') 
      .expect(200) 
      .then(response => {   
        var testMe = response.body.Classnum; 
        assert(0==testMe,"testMe=" + testMe);
    }) 
  });    

  it('xd dev', function(){ 
    assert.equal(app(),'to test xdApp: done.');
  });
});