module.exports = (sequelize, Sequelize) => {
    const g6Item = sequelize.define("Group6Item1", {
      ItemID: { 
        type: Sequelize.INTEGER
      },
      ItemName: {
        type: Sequelize.STRING
      },
      ItemDescription: {
        type: Sequelize.STRING
      },
      ItemThumbnailID: {
        type: Sequelize.INTEGER
      },
      ItemMetadata: {
        type: Sequelize.STRING
      }   
    });
  
    return g6Item;
  };