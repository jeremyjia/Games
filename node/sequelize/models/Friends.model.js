module.exports = (sequelize, Sequelize) => {
    const g6F = sequelize.define("Friends1", {
      RequestID: { 
        type: Sequelize.STRING
      },
      FromID: {
        type: Sequelize.STRING
      },   
      ToID: {
        type: Sequelize.STRING

      },
      status: {
        type: Sequelize.STRING
      },
      request_time: {
        type: Sequelize.STRING

      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return g6F;
  };