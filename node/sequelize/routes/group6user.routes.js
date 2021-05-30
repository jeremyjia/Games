module.exports = app => {
    const Group6Users = require("../controllers/Group6User.controller.js");
  
    var router = require("express").Router();
   
    router.post("/", Group6Users.create);
   
    router.get("/", Group6Users.findAll);
   
    router.get("/published", Group6Users.findAllPublished);
   
    router.get("/:id", Group6Users.findOne);
   
    router.put("/:id", Group6Users.update);
   
    router.delete("/:id", Group6Users.delete);
   
    router.delete("/", Group6Users.deleteAll);
  
    app.use('/api1/group6users', router);
  };