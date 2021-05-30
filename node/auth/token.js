const tag = "[auth/token.js_v0.124]";
//const jwt = require('jsonwebtoken');
const jwt = require('./jwtRedis.js');
const admin = require('./admin/verifyAdmin.js');
const l = require('../logger');
l.tag(tag); 

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
		jwt.verify(bearerToken, (err, authData) => {
			if(err){
				console.log("/api" + xdURL + ": " + err.message);				 
				res.sendStatus(403);
			} else{
				// JWT is valid: Next middleware 
				l.tag1(tag,authData.user);
				req.curUserName = authData.user.username;
				req.curUserID 	= authData.user.id;
				req.curToken = bearerToken;
				next();			
			}
		});

    } else {
		var a = xdURL.split("?");
		console.log("xd:" + a[0] + " " +  Date());
		if(a[0]==="/login"){
			next();
		}
		else if(a[0]==="/checkUserName" ){
			next();
		} 
		else if(a[0]==="/checkEmailAddress" ){
			next();
		} 
		else if(a[0]==="/NewPlayer"){
			next();
		} 
		else if(a[0]==="/adminSignIn"){
			next();
		}
		else if(a[0]==="/verify"){
			next();
		}
		else if(a[0]==="/resetPasswordRequest" || a[0]==="/toResetPassword"){
			next();
		} 
		else{
			// Forbidden
			res.sendStatus(403);
		}
    }
}

exports.sign = function(payload, callback) {
	jwt.sign(payload, { expiresIn: '3600s'},(err, token) => {
		callback(err, token);
	});
}


exports.destroy = function(token) {
	 jwt.destroy(token);
}


/*
exports.getTestToken = function() {
	console.log("xd_dbg: "+Date());
	const testUser = {
		id: 1,
		username: 'TestUser',
		email: 'test@example.com'
	};
	return jwt.sign({user: testUser}, { expiresIn: '3600s'});
}
*/
