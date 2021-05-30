const tag = "[DefaultService.js_v0.215]";
const g6Login = require('../sql/login.js');
const g6Logout = require('./g6Default/logout.js');
const Register = require('../sql/regester.js');
const sqlzSignup = require('./g6Default/sqlzSignup.js');
const sqlzLogin = require('./g6Default/sqlzLogin.js');
const SQL = require('../sql/SQL.js');
const getGameInfo = require('../sql/getGameInfo.js');
const getGamebyUser = require('../sql/getGamebyUser.js');
const deletePlayer = require('../sql/deletePlayer.js');
const getAllPlayers = require('../sql/getAllPlayers.js'); 
const getPendingFriends = require('./g6Default/getPendingFriends.js'); 
const toMakeFriendRequest = require('../sql/toMakeFriendRequest.js');   
const ReponseToMakeFriend = require('./g6Default/ReponseToMakeFriend.js'); 
const getFriends = require('./g6Default/getFriends.js'); 
const setIcon = require('./g6Default/setIcon.js');
const getPlayer = require('./g6Default/getPlayer.js');
const verify = require('./g6Default/verify.js');
const checkUserName = require('./g6Default/checkUserName.js');
const checkEmailAddress = require('./g6Default/checkEmailAddress.js');
const resetPasswordRequest = require('./g6Default/resetPasswordRequest.js');
const toResetPassword = require('./g6Default/toResetPassword.js');
const sqlz2MakeFriendRequest = require('./g6Default/sqlz2MakeFriendRequest.js'); 
 
const Service = require('./Service');
const l = require('../logger');
l.tag(tag); 
 

class DefaultService {
  static loginTest({body: loginInf}) {  
    console.log(loginInf);  

    return new Promise(
        async (resolve) => {
          try {
            //var r = g6Login.g6Login(loginInf,resolve,Service);
            sqlzLogin.login(loginInf,resolve,Service); 
          } catch (e) {
            resolve(Service.rejectResponse(
              e.message || 'Invalid input',
              e.status || 405,
            ));
          }
        },
      );
  }
  
  static logout(req) {   
    return new Promise(
        async (resolve) => {
          try {
            var r = g6Logout.g6Logout(req,resolve,Service);
            /*
            var o = {};
            o.api = "logout";
            o.v = "v0.11";
            resolve(Service.successResponse(o));
            //*/
          } catch (e) {
            resolve(Service.rejectResponse(
              e.message || 'Invalid input',
              e.status || 405,
            ));
          }
        },
      );
  }

  
  static addPlayer({body: group6User}) {
    
    l.tag1(tag,JSON.stringify(group6User));

    return new Promise(
        async (resolve) => {
          try {
           // Register.register(group6User,resolve,Service);
            sqlzSignup.signup(group6User,resolve,Service);
            
          } catch (e) {
            resolve(Service.rejectResponse(
              e.message || 'Invalid input',
              e.status || 405,
            ));
          }
        },
      );
  }
  static verify(req) {

    return new Promise(
      async (resolve) => {
        try {
          verify.toVerify(req,resolve,Service);      
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  static toResetPassword(req ) {

    return new Promise(
      async (resolve) => {
        try {
          toResetPassword.toResetPassword(req,resolve,Service);      
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }
  static checkUserName({ UserName  }) {

    return new Promise(
      async (resolve) => {
        try {
          checkUserName.check(UserName ,resolve,Service);      
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  static checkEmailAddress({ EmailAddress  }) {

    return new Promise(
      async (resolve) => {
        try {
          checkEmailAddress.check(EmailAddress ,resolve,Service);      
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }
  static resetPasswordRequest({ emailAddress }) {

    return new Promise(
      async (resolve) => {
        try {
          resetPasswordRequest.resetPasswordRequest(emailAddress,resolve,Service);      
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }


  /**
   *
   * id String query id.
   * returns List
   **/
  static getPlayer({ id }) {

    return new Promise(
      async (resolve) => {
        try {
          //var r = SQL.getUserInfo(id,resolve,Service); 
          var r = getPlayer.getInfo(id,resolve,Service);
         // resolve(Service.successResponse(r));           
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }
  static getAllPlayers({ id }) {

    return new Promise(
      async (resolve) => {
        try {
            getAllPlayers.getAllPlayers(resolve,Service);        
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }
  
  static getPendingFriends({ id }) {

    return new Promise(
      async (resolve) => {
        try {
          getPendingFriends.getPendingFriends(resolve,Service);        
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }
  static getFriends({ id }) {

    return new Promise(
      async (resolve) => {
        try {
          getFriends.getFriends(resolve,Service);        
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }
  static RequestToMakeFriend({body: reqBody}) {

    return new Promise(
      async (resolve) => {
        try {
          //toMakeFriendRequest.toMakeFriendRequest(reqBody,resolve,Service);        
          sqlz2MakeFriendRequest.request2MakeFriend(reqBody,resolve,Service);
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }
 
 
  static ReponseToMakeFriend({body: reqBody}) {
    return new Promise(
      async (resolve) => {
        try {
          ReponseToMakeFriend.ReponseToMakeFriend(reqBody,resolve,Service);        
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  
  static setIcon(_o) {
    l.tag1(tag,"xddbg11================ curUserName: "  + _o.curUserName);
    l.tag1(tag,"xddbg11================ curUserID: "    + _o.curUserID);
    var _body = {};
    _body.UserID = _o.curUserID;
    _body.IconID = _o.body.IconID;

    return new Promise(
      async (resolve) => {
        try {
            setIcon.setIcon(_body,resolve,Service);                  
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  static coinAndgem({ id }) {

    return new Promise(
      async (resolve) => {
        try {
          var r = SQL.getUserInfo(h,u,pw,db,id,resolve,Service); 
         // resolve(Service.successResponse(r));           
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  static getGameInfo({ id }) {

    return new Promise(
      async (resolve) => {
        try {
          var r = getGameInfo.getGameInfo(h,u,pw,db,id,resolve,Service); 
         // resolve(Service.successResponse(r));           
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  static deletePlayerGET({ id }) {

    return new Promise(
      async (resolve) => {
        try {
          var r = deletePlayer.deletePlayer(h,u,pw,db,id,resolve,Service); 
         // resolve(Service.successResponse(r));           
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  static getGamebyUser({ id }) {

    return new Promise(
      async (resolve) => {
        try {
          var r = getGamebyUser.getGamebyUser(h,u,pw,db,id,resolve,Service); 
         // resolve(Service.successResponse(r));           
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  static gameStarted({body: group6Game}) {

    var r = gameStarted.gameStarted(u,pw,db,game);  

    console.log(group6Game);
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(r));           
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }
}

module.exports = DefaultService;
