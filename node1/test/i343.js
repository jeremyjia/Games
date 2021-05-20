const assert = require('chai').assert;
const app = require('../app/i343');

describe('i343', function(){
  it('test: i343', function(){
    assert.equal(app(),'to test i343: done.');
  });
});