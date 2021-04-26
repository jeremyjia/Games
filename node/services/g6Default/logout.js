const tag = "[g6Default/logout.js_v0.25]";
const token = require('../../auth/token'); 
const l = require('../../logger');
const ULID = require('ulid');

 l.tag(tag);
 
exports.g6Logout = async function(req,resolve,Service){ 
    l.tag1(tag,JSON.stringify(req));
    // to do ... 

    token.destroy(req.curToken);
    var o = {};
    o.code       = 1;
    o.v         = tag;
    o.token     = req.curToken;
    resolve(Service.successResponse(o));
}
