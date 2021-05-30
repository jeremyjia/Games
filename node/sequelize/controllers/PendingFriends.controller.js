const db = require("../models");

const l = require('../../logger'); 

const g6PF = db.PendingFriends;
const Op = db.Sequelize.Op;
 
exports.addPlayer = (req, res) => {
  const u = req.body;
 
  g6PF.create(u)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    }); 
}

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
   
    const u = {
      UserName: req.body.UserName,
      EmailAddress: req.body.EmailAddress 
    };
   
    g6PF.create(u)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };
 
exports.findAll = (req, res) => {
  const UserName = req.query.UserName;
  var condition = UserName ? { UserName: { [Op.like]: `%${UserName}%` } } : null;

  l.tag1("findAll",UserName);

  g6PF.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving PendingFriends."
      });
    });
};
 
exports.findOne = (req, res) => {
    const UserID = req.params.UserID;
    console.log("xd.................");

    l.tag1("xd",UserID);

    g6PF.findByPk(UserID)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Group6User with id=" + id
        });
      });
  };
 
exports.update = (req, res) => {
    const id = req.params.id;
  
    g6PF.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Group6User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Group6User with id=${id}. Maybe Group6User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Group6User with id=" + id
        });
      });
  };
 
exports.delete = (req, res) => {
    const id = req.params.id;
  
    g6PF.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Group6User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Group6User with id=${id}. Maybe Group6User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Group6User with id=" + id
        });
      });
  };
 
exports.deleteAll = (req, res) => {
    g6PF.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} PendingFriends were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all PendingFriends."
        });
      });
  };
 
exports.findAllPublished = (req, res) => {
    g6PF.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving PendingFriends."
        });
      });
  };