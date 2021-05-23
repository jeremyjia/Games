const assert = require('chai').assert;
const app = require('../app/i332.js');

describe('App4-i-332-Test', function(){
  it('test1', function(){
    assert.equal(app(),'to test i332: done.');
  }); 
});