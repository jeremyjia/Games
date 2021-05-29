module.exports = app => {
    const Friends = require("../controllers/Friends.controller.js");
  
    var router = require("express").Router();
   
    router.post("/", Friends.create);
   
    router.get("/", Friends.findAll);
   
    router.get("/published", Friends.findAllPublished);
   
    router.get("/:id", Friends.findOne);
   
    router.put("/:id", Friends.update);
   
    router.delete("/:id", Friends.delete);
   
    router.delete("/", Friends.deleteAll);
  
    app.use('/api1/friends', router);
  };