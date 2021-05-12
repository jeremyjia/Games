'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.authenticateUser = function authenticateUser (req, res, next, body) {
  User.authenticateUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserById = function getUserById (req, res, next, id) {
  User.getUserById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.newUser = function newUser (req, res, next, body) {
  User.newUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
