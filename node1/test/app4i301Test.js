const assert = require('chai').assert;
const app = require('../app4i301');

describe('app4i301', function(){
  it('test: app4i301', function(){
    assert.equal(app(),'to test app4i301: done');
  });
});