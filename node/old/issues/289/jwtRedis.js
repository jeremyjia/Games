const tag = "[jwtRedis.js_v0.21] ";
var redis = require('redis');
var JWTR =  require('jwt-redis').default;

var redisClient = redis.createClient();
var jwtr = new JWTR(redisClient);
 


const l = require('../../../logger');
l.tag(tag);
 
const e = {};
module.exports = e;

e.sign = function(payload, secret,callback){ 
    var r = tag + 'sign...';
    l.tag1(tag,r);
    // Create a token
    jwtr.sign(payload, secret)
    .then((token)=>{ 
            console.log("token="+token); 
            callback(token);
    })
    .then(()=>{ 
            console.log("xd:--------- ");             
    });
    l.tag1(tag,"sign return.");
    return r;
}
e.verify = function(token,secret,callback){   
    var r = tag + 'verify...';
    l.tag1(tag,r);
    jwtr.verify(token, secret).then(decode => {
        // [Object]
                console.log("decode="+JSON.stringify(decode));
                var s = decode;//JSON.stringify(decode);
                callback(s);
        }).catch(err => {
        // Wrong token
                console.log("xd:========" + err);
        });
    return r;
}
e.destroy = function(jti, secret,callback){
    jwtr.destroy(jti, secret).then(xd=>{
        l.tag1(tag,"destroy...");
        var s = "destroy";
        callback(s);
    });
}


e.test = function(){        
    var secret = 'secret';
    var jti = 'test';
    var payload = { jti }; 
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
}

e.test2 = function(){
        /**
         * Just few lines to test the behavior.
         */

        const TokenGenerator = require('./ctoken.js');
        const jwt = require('jsonwebtoken');

        const tokenGenerator = new TokenGenerator('a', 'a', { algorithm: 'HS256', keyid: '1', noTimestamp: false, expiresIn: '2m', notBefore: '2s' })
        token = tokenGenerator.sign({ myclaim: 'something' }, { audience: 'myaud', issuer: 'myissuer', jwtid: '1', subject: 'user' })
        setTimeout(function () {
        token2 = tokenGenerator.refresh(token, { verify: { audience: 'myaud', issuer: 'myissuer' }, jwtid: '2' })
        console.log(jwt.decode(token, { complete: true }))
        console.log(jwt.decode(token2, { complete: true }))
        }, 3000)
}
e.test3 = async function(){
        console.log("test3:--------- ");  
        var secret = 'secret';
        var jti = 'test';
        var user = "u1";
        var password = "u1";
        var payload = { user,password,jti }; 
        // Create a token
        var token = await jwtr.sign(payload, secret);
        console.log("test3:--------- token = " + token);  

        var decode = await jwtr.verify(token, secret);
        var sd = JSON.stringify(decode);
        console.log("test3-1: decode = " + sd);
         
        await jwtr.destroy(jti, secret);

        try{
                var decode = await jwtr.verify(token, secret);
                var sd = JSON.stringify(decode);
                console.log("test3-2: decode = " + sd);
        }catch(e){                
                console.log("test3-e: e = " + e);
        }        
}
e.aSign = async function(secret,req,res){          
        var u = req.body.user;
        var pw = req.body.password;
        var jti ="test";
        var payload = {u,pw,jti};

        var token = await jwtr.sign(payload, secret); 
        var r = {};
        r.token = token;
        res.json(r);
}
e.aVerify = async function(secret,req,res){          
        try{
                var token = req.body.token;
                var decode = await jwtr.verify(token, secret);
                var sd = JSON.stringify(decode);
                console.log("aVerify: decode = " + sd);
                res.json(decode);
        }catch(e){                
                console.log("aVerify-e: e = " + e);
                var r = {};
                r.error = e;
                res.json(r);
        }   
}
e.aDestroy = async  function(secret,req,res){          
        //*
        var token = req.body.token;         
        var decode = await jwtr.verify(token, secret);
        var jti = decode.jti;
        await jwtr.destroy(jti, secret);
        //*/
        var o = {};
        o.msg = "aDestroy";
        res.json(o);

}