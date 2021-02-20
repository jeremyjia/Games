const tag = "[auth/jwtRedis.js_v0.14]"; 
var redis = require('redis');
var JWTR =  require('jwt-redis').default;
const conf = require("../config.js");

const secret = conf.jwt_secret;

var redisClient = redis.createClient({host: conf.redis_host, port: conf.redis_port});
var jwtr = new JWTR(redisClient);

const l = require('../logger');
l.tag(tag); 

exports.verify = async function(token,callback){  
    var err = null;
    
    try{
        var decode = await jwtr.verify(token, secret); 
        callback(err,decode);
    }
    catch(e){
        err = {};
        err.message = e;
        callback(err,decode);
    }
}

exports.sign = async function(payload,oExp,callback) {
	var err = "error";	
    payload.jti = "jti-test";
    var token = await jwtr.sign(payload, secret); 
	callback(err, token);
} 

exports.destroy = async function(token) { 
    var decode = await jwtr.verify(token, secret);
    var jti = decode.jti;
    await jwtr.destroy(jti, secret);
} 
