const tag = "[services/g6Admin/reset.js_v0.113]";  
const db = require("../../sequelize/models");
const g6u = db.Group6Users;
const g6PF = db.PendingFriends;
const l = require('../../logger');
l.tag(tag);   

exports.reset = async function(reqInf,resolve,Service)
{        
    var id = reqInf[0].ID;
    if(1==id){
        await _reset_Group6User(resolve,Service);  
    }
    else if(2==id){
        await _reset_PendingFriends(resolve,Service);  
    }
    else{
        var r = {};
        r.tag = tag;
        r.code = -1;
        r.message = "test branch";
        resolve(Service.successResponse(r));
    }
} 

async function _reset_Group6User(resolve,Service)
{  
    var r = {};

    r.v = "v0.12"; 
    r.code = 1;//-1;
    r.n = 4;
    r.ID = 1;

    g6u.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        r.code = 1;
        r.message = "reset Group6User table OK.";
        
        resolve(Service.successResponse(r));
    })
    .catch(err => {
        r.code = -1; 
        r.message = "Some error occurred: " + err.message;
        resolve(Service.successResponse(r));
    });    
}

async function _reset_PendingFriends(resolve,Service)
{  
    var r = {};

    r.v = "v0.11"; 
    r.code = 1;//-1;
    r.n = 4;
    r.ID = 2;
    g6PF.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        r.code = 1;
        r.message = "reset PendingFriends table OK.";
        
        resolve(Service.successResponse(r));
    })
    .catch(err => {
        r.code = -1; 
        r.message = "Some error occurred: " + err.message;
        resolve(Service.successResponse(r));
    });    
}