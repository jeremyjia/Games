const assert = require('chai').assert;
const app = require('../app/wx');

describe('wx', function(){
  it('test: wx', function(){
    assert.equal(app(),'to test wx: done.');
  });
});