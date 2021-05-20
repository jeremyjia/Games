const assert = require('chai').assert;
const app = require('../app');

describe('App', function(){
  it('test: App', function(){
    assert.equal(app(),'to test PGN: ok!');
  });
});