var tag = "[auth/admin/verifyAdmin.js_v0.43]";
var jwt = require('jsonwebtoken');
var l = require('../../logger');

const conf = require('../../config');

l.tag(tag); 
exports.verifyAdmin = function(req,res, next){ 
    var xdURL = req.url;
    l.tag1(tag,xdURL);
     
    var bearerHeader = req.headers['authorization']; 
    if(typeof bearerHeader !== 'undefined'){ 
        var bearer = bearerHeader.split(' ');  
        var bearerToken = bearer[1];  
        req.token = bearerToken;
		jwt.verify(bearerToken, conf.jwt_secret, (err, authData) => {
			if(err){
				console.log("xddbg:    /api" + xdURL + ": " + err.message);
				res.json({
					message: err.message,
					v: 'v0.21'
				}); 

				res.sendStatus(403);
			} else{
                l.tag1(tag,"---------------------------------------"); 
                if(xdURL=="/reset"){
                    if(authData.user.username != "admin"){
                        res.sendStatus(403);
                    }
                }
                else if(xdURL=="/addItem"){
                    if(authData.user.username != "admin"){
                        res.sendStatus(403);
                    }
                }
                else if(xdURL=="/removeItem"){
                    if(authData.user.username != "admin"){
                        res.sendStatus(403);
                    }
                }
                else if(xdURL=="/addUserItem"){
                    if(authData.user.username != "admin"){
                        res.sendStatus(403);
                    }
                }
                else if(xdURL=="/removeUserItem"){
                    if(authData.user.username != "admin"){
                        res.sendStatus(403);
                    }
                }
			//	next();  
			}
		});
    } 
}
