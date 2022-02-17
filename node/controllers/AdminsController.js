const tag = "[controllers/AdminController.js_v0.21]";
const Controller = require('./Controller');
const l = require('../logger');
l.tag(tag); 

class AdminsController {
  constructor(Service) {
    this.service = Service;
  }

  async adminSignIn(request, response) {
    await Controller.handleRequest(request, response, this.service.adminSignIn);
  }
  async reset(request, response) {
    await Controller.handleRequest(request, response, this.service.reset);
  }
  async innerCheck(request, response) {
    await Controller.handleRequest(request, response, this.service.innerCheck);
  }  
  async innerMigrateData(request, response) {
    await Controller.handleRequest(request, response, this.service.innerMigrateData);
  }
  async endGame(request, response) {
    await Controller.handleRequest(request, response, this.service.endGame);
  }

  async newGame(request, response) {
    await Controller.handleRequest(request, response, this.service.newGame);
  }

  async addItem(request, response) {
    await Controller.handleRequest(request, response, this.service.addItem);
  }  
  async removeItem(request, response) {
    await Controller.handleRequest(request, response, this.service.removeItem);
  }  

  //addUserItem
  async addUserItem(request, response) {
    await Controller.handleRequest(request, response, this.service.addUserItem);
  }  

  async removeUserItem(request, response) {
    await Controller.handleRequest(request, response, this.service.removeUserItem);
  }  


}

module.exports = AdminsController;
