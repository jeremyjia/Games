module.exports = (sequelize, Sequelize) => {
    const g6UserItem = sequelize.define("Group6UserItem1", {
      UserID: { 
        type: Sequelize.STRING
      },
      ItemID: {
        type: Sequelize.INTEGER
      },
      ItemQuantity: {
        type: Sequelize.INTEGER
      } 
    });
  
    return g6UserItem;
  };