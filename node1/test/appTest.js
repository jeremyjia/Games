const assert = require('chai').assert;
const app = require('../app');

describe('App', function(){
  it('test1', function(){
    assert.equal(app(),'test1');
  });
});