'use strict';


/**
 * Log in a User.
 * Authenticate a specific User with their email address and password. 
 *
 * body LoginInfo Email address and plain-text password for the User being authenticated.

 * returns inline_response_200
 **/
exports.authenticateUser = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "token" : "Login Success!"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Fetch data about a specific User.
 * Returns information about the specified User. Include username and church jointed. 
 *
 * id id Unique ID of a User.  Exact type/format will depend on your implementation but will likely be either an integer or a string. 
 * returns UserInfo
 **/
exports.getUserById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "church" : "",
  "username" : "Amy Chan"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * register a new user
 *
 * body LoginInfo user email and password.
 * returns inline_response_201
 **/
exports.newUser = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : "123"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

