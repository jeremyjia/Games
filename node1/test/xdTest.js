const assert = require('chai').assert;
const app = require('../app/xd.js');

describe('xdApp', function(){
  it('xdTest', function(){
    assert.equal(app(),'to test xdApp(i332): done.');
  });
});