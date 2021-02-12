const tag = "[controllers/DefaultController.js_v0.44]";
const Controller = require('./Controller');
const l = require('../logger');
l.tag(tag); 


class DefaultController {
  constructor(Service) {
    this.service = Service;
  }

  async loginTest(request, response) {
    await Controller.handleRequest(request, response, this.service.loginTest);
  }

  async addPlayer(request, response) {
    console.log(tag + " request = " + request ); 
    await Controller.handleRequest(request, response, this.service.addPlayer);
  }

  async coinAndgem(request, response) {
    await Controller.handleRequest(request, response, this.service.coinAndgem);
  }

  async getPlayerGET(request, response) {
    await Controller.handleRequest(request, response, this.service.getPlayerGET);
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
