var redis = require('redis');
var JWTR =  require('jwt-redis').default;
//ES6 import JWTR from 'jwt-redis';
var redisClient = redis.createClient();
var jwtr = new JWTR(redisClient);
 
var secret = 'secret';
var jti = 'test';
var payload = { jti };
 
// Create a token
jwtr.sign(payload, secret)
    .then((token)=>{
            // Token verification
            return jwtr.verify(token, secret);
    })
    .then(()=>{
            // Destroying the token
            return jwtr.destroy(jti, secret);
    });