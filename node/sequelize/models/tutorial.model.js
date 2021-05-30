module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      test0: {
        type: Sequelize.STRING
      },
      test1: {
        type: Sequelize.STRING
      },
      test12: {
        type: Sequelize.STRING
      }
    });
  
    return Tutorial;
  };