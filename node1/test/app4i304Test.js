const assert = require('chai').assert;
const app = require('../app4i304');

describe('App', function(){
  it('test1', function(){
    assert.equal(app(),'to test app4i304: done');
  });
});