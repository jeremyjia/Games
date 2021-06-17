const assert = require('chai').assert;
const app = require('../app/littlefluteFork.js');

describe('littlefluteFork', function(){
  it('littlefluteFork', function(){
    assert.equal(app(),'to test littlefluteForkApp: done.');
  });
});