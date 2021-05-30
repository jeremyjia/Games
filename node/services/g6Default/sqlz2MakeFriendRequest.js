const tag = "[sqlz2MakeFriendRequest.js_v0.21]";

const db = require("../../sequelize/models");
const g6PF = db.PendingFriends;
const ULID = require('ulid');
const l = require('../../logger'); 

l.tag(tag);
 
exports.request2MakeFriend = async function(oBody,resolve,Service){ 
    var r = {};
    r.tag = tag;
    r.oBody = oBody;
    l.tag1(tag,oBody);

    const newReq = {
        RequestID: ULID.ulid(),
        FromID: oBody.FromID,
        ToID: oBody.ToID,
        status: oBody.status
    };
     
    await g6PF.create(newReq)
    .then(data => { 
            r.data = data;
            r.code = 1;
    })
    .catch(err => {
        r.msg = err;
        r.code = -1;
    });


    resolve(Service.successResponse(r));   
} 
