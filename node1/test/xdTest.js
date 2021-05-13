const assert = require('chai').assert;
const app = require('../app/xd.js');

describe('App', function(){
  it('xdTest', function(){
    assert.equal(app(),'to test xdApp: doing.');
  });
});