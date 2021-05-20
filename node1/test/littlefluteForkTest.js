const assert = require('chai').assert;
const app = require('../app/littlefluteFork.js');

describe('xdApp', function(){
  it('xdTest', function(){
    assert.equal(app(),'to test littlefluteForkApp(fix #352): done.');
  });
});