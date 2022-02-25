'use strict';


/**
 * Server example operation
 * This is an example operation to show how security is applied to the call.
 *
 * no response value expected for this operation
 **/
exports.exampleGET = function() {
  return new Promise(function(resolve, reject) {
    
    var o = {v:'0.11',d: Date()};
    resolve(o);
  });
}


/**
 * Server heartbeat operation
 * This operation shows how to override the global security defined above, as we want to open it up for all users.
 *
 * no response value expected for this operation
 **/
exports.pingGET = function() {
  return new Promise(function(resolve, reject) {
    console.log("ping... " + new Date());
    var o = {a:100,b:'b'};
    resolve(o);
  });
}

