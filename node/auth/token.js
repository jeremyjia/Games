const tag = "[auth/token.js_v0.111]";

var redis = require('redis');
var JWTR =  require('jwt-redis').default;
var redisClient = redis.createClient();
var jwt1 = new JWTR(redisClient);

const admin = require('./admin/verifyAdmin.js');
 
const l = require('../logger');
l.tag(tag); 

const secret = 'secretkey';

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
// Verify Token 
exports.verify = function(req,res, next){ 
	var xdURL = req.url;
	l.tag1(tag,xdURL);

	admin.verifyAdmin(req,res,next);

    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        
        console.log("bearerToken : " + bearerToken);

        // Set the token
        req.token = bearerToken;
		jwt1.verify(bearerToken,'secretkey', (err, authData) => {
			if(err){
				console.log("/api" + xdURL + ": " + err.message);
				res.json({
					message: err.message,
					v: 'v0.21'
				}); 

				res.sendStatus(403);
			} else{ 
				console.log(authData);
				next();  
			}
		});

    } else {
		var a = xdURL.split("?");
		console.log("xd:" + a[0] + " " +  Date());
		if(a[0]==="/login"){
			next();
		}
		else if(a[0]==="/NewPlayer"){
			next();
		} 
		else if(a[0]==="/adminSignIn"){
			next();
		}
		else{
			// Forbidden
			res.sendStatus(403);
		}
    }
}

exports.sign = function(payload, callback) { 
	jwt1.sign(payload, secret,{ expiresIn: '3600s'})
    .then((token)=>{
			// your code
			callback(token);
    })
    .catch((error)=>{
			// error handling
			l.tag1(tag,"xd dbg .................................");
    });
}

exports.getTestToken = function() {
	console.log("xd_dbg: "+Date());
	const testUser = {
		id: 1,
		username: 'TestUser',
		email: 'test@example.com'
	};
	return jwt1.sign({user: testUser}, secret, { expiresIn: '3600s'});
}
