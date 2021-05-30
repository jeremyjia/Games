const tag = "[controllers/DefaultController.js_v0.114]";
const Controller = require('./Controller');
const sqlzCtrler = require("../sequelize/controllers/Group6User.controller.js");

const l = require('../logger');
l.tag(tag); 


class DefaultController {
  constructor(Service) {
    this.service = Service;
  }

  async loginTest(request, response) {
    await Controller.handleRequest(request, response, this.service.loginTest);
  }
  async logout(request, response) {
    l.tag1(tag,"logout 1 ..." + request.curUser);
    await Controller.handleRequest(request, response, this.service.logout);
  }

  async setIcon(request, response) {
    l.tag1(tag,"xd2DoSetIcon ...   curUserName=" + request.curUserName);
    l.tag1(tag,"xd2DoSetIcon ...   curUserID=" + request.curUserID);
    await Controller.handleRequest(request, response, this.service.setIcon);
  }
  
  async verify(request, response) { 
    await Controller.handleRequest(request, response, this.service.verify);
  }

  async checkUserName(request, response) { 
    await Controller.handleRequest(request, response, this.service.checkUserName);
  }

  async checkEmailAddress(request, response) { 
    await Controller.handleRequest(request, response, this.service.checkEmailAddress);
  }

  async resetPasswordRequest(request, response) { 
    await Controller.handleRequest(request, response, this.service.resetPasswordRequest);
  }

  async toResetPassword(request, response) { 
    await Controller.handleRequest(request, response, this.service.toResetPassword);
  }


  async addPlayer(request, response) {
    console.log(tag + " request = " + request ); 
    //await sqlzCtrler.addPlayer(request,response);
    await Controller.handleRequest(request, response, this.service.addPlayer);
  }

  async coinAndgem(request, response) {
    await Controller.handleRequest(request, response, this.service.coinAndgem);
  }

  async getPlayer(request, response) {
    await Controller.handleRequest(request, response, this.service.getPlayer);
  }

  async getAllPlayers(request, response) {
    await Controller.handleRequest(request, response, this.service.getAllPlayers);
  }
  
  async getPendingFriends(request, response) {
    await Controller.handleRequest(request, response, this.service.getPendingFriends);
  }
  async RequestToMakeFriend(request, response) {
    await Controller.handleRequest(request, response, this.service.RequestToMakeFriend);
  } 
  async ReponseToMakeFriend(request, response) {
    await Controller.handleRequest(request, response, this.service.ReponseToMakeFriend);
  }
  
  async getFriends(request, response) {
    await Controller.handleRequest(request, response, this.service.getFriends);
  }

  async getGameInfo(request, response) {
    await Controller.handleRequest(request, response, this.service.getGameInfo);
  }

  async getGamebyUser(request, response) {
    await Controller.handleRequest(request, response, this.service.getGamebyUser);
  }

  async deletePlayerGET(request, response) {
    await Controller.handleRequest(request, response, this.service.deletePlayerGET);
  }
  
}

module.exports = DefaultController;
