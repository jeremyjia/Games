module.exports = app => {
    const PendingFriends = require("../controllers/PendingFriends.controller.js");
  
    var router = require("express").Router();
   
    router.post("/", PendingFriends.create);
   
    router.get("/", PendingFriends.findAll);
   
    router.get("/published", PendingFriends.findAllPublished);
   
    router.get("/:id", PendingFriends.findOne);
   
    router.put("/:id", PendingFriends.update);
   
    router.delete("/:id", PendingFriends.delete);
   
    router.delete("/", PendingFriends.deleteAll);
  
    app.use('/api1/pendingfriends', router);
  };