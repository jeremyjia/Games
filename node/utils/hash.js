const tag = "[utils/hash.js_v0.14]";
const l = require('../logger');
l.tag(tag);

const bcrypt = require('bcrypt');
const saltRounds = 10; 

const e = {};

e.toHash = function(pw){
    return bcrypt.hashSync(pw, saltRounds);    
}
e.toCompare = function(plaintextPW,hash){  
    return bcrypt.compareSync(plaintextPW, hash);      
}

module.exports = e;