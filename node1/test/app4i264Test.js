const assert = require('chai').assert;
const app = require('../app4i264.js');

describe('App', function(){
  it('test1', function(){
    assert.equal(app(),'to test i264: done.');
  }); 
});