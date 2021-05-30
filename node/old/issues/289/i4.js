var redis = require('redis');
var JWTR =  require('jwt-redis').default;
//ES6 import JWTR from 'jwt-redis';
var redisClient = redis.createClient();
var jwtr = new JWTR(redisClient);
 
var secret = 'secret';
var jti = 'test';
var payload = { jti };
var token1 = "1111";
 
// Create a token
jwtr.sign(payload, secret)
    .then((token)=>{
            // Token verification
            console.log("token="+token);
            var b =jwtr.verify(token, secret).then(decode => {
                // [Object]
                        console.log("decode="+JSON.stringify(decode));
                }).catch(err => {
                // Wrong token
                        console.log("xd:========" + err);
                });
            console.log("b="+JSON.stringify(b));
            return b;
    })
    .then(()=>{
            // Destroying the token  
            console.log("xd:--------- ");            
            return jwtr.destroy(jti, secret);
    });