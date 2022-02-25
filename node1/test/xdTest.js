const assert = require('chai').assert;
const app = require('../app/xd.js');

describe('xdApp', function(){ 
  it('xd dev', function(){ 
    assert.equal(app(),'to test xdApp: done.w1_2022_02_25');
  });
});