const tag = "[DefaultService.js_v0.141]";
const g6Login = require('../sql/login.js');
const Register = require('../sql/regester.js');
const SQL = require('../sql/SQL.js');
const getGameInfo = require('../sql/getGameInfo.js');
const getGamebyUser = require('../sql/getGamebyUser.js');
const deletePlayer = require('../sql/deletePlayer.js');
const getAllPlayers = require('../sql/getAllPlayers.js'); 
const getPendingFriends = require('../sql/getPendingFriends.js'); 
const toMakeFriendRequest = require('../sql/toMakeFriendRequest.js');   
const ReponseToMakeFriend = require('./g6Default/ReponseToMakeFriend.js'); 
const getFriends = require('./g6Default/getFriends.js'); 
 
const Service = require('./Service');
const l = require('../logger');
l.tag(tag); 
 

class DefaultService {
  static loginTest({body: loginInf}) {  
    console.log(loginInf);  

    return new Promise(
        async (resolve) => {
          try {
            var r = g6Login.g6Login(loginInf,resolve,Service);
            //resolve(Service.successResponse(tag + ' OK! r=' ));
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
   * api/addPlayer
   * Adds an player to the system
   *
   * group6User Group6User Inventory item to add (optional)
   * no response value expected for this operation
   **/
  static addPlayer({body: group6User}) {
    
    l.tag1(tag,JSON.stringify(group6User));

    return new Promise(
        async (resolve) => {
          try {
            Register.register(group6User,resolve,Service);
            
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
  static getPlayerGET({ id }) {

    return new Promise(
      async (resolve) => {
        try {
          var r = SQL.getUserInfo(id,resolve,Service); 
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
          toMakeFriendRequest.toMakeFriendRequest(reqBody,resolve,Service);        
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }
  //ReponseToMakeFriend
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
