const assert = require('chai').assert;
const app = require('../app/python');

describe('python', function(){
  it('test: python', function(){
    assert.equal(app(),'to test python: done.');
  });
});
