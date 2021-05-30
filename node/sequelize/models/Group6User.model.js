module.exports = (sequelize, Sequelize) => {
    const g6u = sequelize.define("Group6User1", {
      UserID: { 
        type: Sequelize.STRING
      },
      UserName: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      FirstName: {
        type: Sequelize.STRING
      },
      LastName: {
        type: Sequelize.STRING
      },
      EmailAddress:{
        type: Sequelize.STRING
      },
      Location:{
        type: Sequelize.STRING
      },
      PhoneNumber:{
        type: Sequelize.STRING
      },
      VerifyCode: {
        type: Sequelize.STRING
      },
      IsVerified: {
        type: Sequelize.STRING
      },
      DateOfBirth: {
        type: Sequelize.STRING
      },
      AgreeTerms: {
        type: Sequelize.STRING
      },       
      IconID:{
        type: Sequelize.INTEGER
      },
      Coin:{
        type: Sequelize.INTEGER
      },
      Gem:{
        type: Sequelize.INTEGER
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return g6u;
  };