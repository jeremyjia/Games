const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res) => {
    const _v_api = "v0.14";
    console.log("/api " + _v_api);
    res.json({
        message: '/api ' + _v_api + ' : Welcome to the API'
    })
})

app.post('/api/posts',verifyToken,(req,res) => {
    console.log("/api/posts v0.14: ");
    jwt.verify(req.token,'secretkey', (err, authData) => {
        if(err){
            console.log("/api/posts : " + err.message);
            //res.sendStatus(403);
            res.json({
                message: err.message,
                v: 'v0.15'
            });

        } else{
            res.json({
                date: new Date,
                message: 'Post created ...',
                authData
            });
        }

    });
});

app.post('/api/login', (req, res) => {
    const _v_login = "v0.12";
    console.log("login " + _v_login);
    // Mock user
    const user = {
        v: _v_login,
        id: 1,
        username: 'yongling',
        emial: 'yongling.huang@group6.io'
    }
    jwt.sign({user: user},'secretkey',{ expiresIn: '3600s'},(err, token) => {
        res.json({
            token
        });
    });
});

// FORMAT OF TOKEN
// Auththorization: Bearer <access_token>
// Verify Token 
function verifyToken(req,res, next){
    console.log("verifyToken v0.14: ");
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
        // Next middleware
        next();

    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

app.listen(3000, () => console.log('v0.24: Server started on port 3000.'));
