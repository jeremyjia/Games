const tag = "[AdminsService.js_v0.143]";
const Service = require('./Service');
const gameStarted = require('../sql/gameStarted.js');
const gameEnded = require('../sql/gameEnded.js');
const g6A = require('./g6Admin/signin.js'); 
const adminReset = require('./g6Admin/reset.js');

const l = require('../logger');
l.tag(tag);  
  
 

class AdminsService {
  static adminSignIn({ body: reqInf }) {
    l.tag1(tag,"xdtest1: ==========");
    
    return new Promise(
      async (resolve) => {
        try {
          //resolve(Service.successResponse(r));
          var r = g6A.signin(reqInf,resolve,Service);  
           
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
   * api/endGame
   * ended a game
   *
   * group6Game Group6Game Inventory item to add (optional)
   * no response value expected for this operation
   **/
  static endGame({ body: group6Game }) {
    
    gameEnded.gameEnded(h,u,pw,db,group6Game);
    
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse('endGame v0.1...'));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }
  static reset({body: reqInf}) { 
    
    return new Promise(
      async (resolve) => {
        try {
          //var r = {};
          //r.test = "reset";
          //resolve(Service.successResponse(r));
          var r = adminReset.reset(reqInf,resolve,Service);  
           
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
   * api/endGame
   * ended a game
   *
   * group6Game Group6Game Inventory item to add (optional)
   * no response value expected for this operation
   **/
  static endGame({ body: group6Game }) {
    
    gameEnded.gameEnded(h,u,pw,db,group6Game);
    
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse('endGame v0.1...'));
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
   * api/newGame
   * Adds a new game to the system
   *
   * group6Game Group6Game Description of started game (optional)
   * no response value expected for this operation
   **/
  static newGame({body: group6Game}) {
  
  gameStarted.gameStarted(h,u,pw,db,group6Game);
  
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse('newGame: v0.1...'));
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

module.exports = AdminsService;
