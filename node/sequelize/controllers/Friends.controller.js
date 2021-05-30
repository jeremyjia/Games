const db = require("../models");

const l = require('../../logger'); 

const g6F = db.Friends;
const Op = db.Sequelize.Op;
 
exports.addPlayer = (req, res) => {
  const u = req.body;
 
  g6F.create(u)
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
   
    g6F.create(u)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Friends."
        });
      });
  };
 
exports.findAll = (req, res) => {
  const UserName = req.query.UserName;
  var condition = UserName ? { UserName: { [Op.like]: `%${UserName}%` } } : null;

  l.tag1("findAll",UserName);

  g6F.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Friends."
      });
    });
};
 
exports.findOne = (req, res) => {
    const UserID = req.params.UserID;
    console.log("xd.................");

    l.tag1("xd",UserID);

    g6F.findByPk(UserID)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Friends with id=" + id
        });
      });
  };
 
exports.update = (req, res) => {
    const id = req.params.id;
  
    g6F.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Friends was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Friends with id=${id}. Maybe Friends was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Friends with id=" + id
        });
      });
  };
 
exports.delete = (req, res) => {
    const id = req.params.id;
  
    g6F.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Friends was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Friends with id=${id}. Maybe Friends was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Friends with id=" + id
        });
      });
  };
 
exports.deleteAll = (req, res) => {
    g6F.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Friends were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Friends."
        });
      });
  };
 
exports.findAllPublished = (req, res) => {
    g6F.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Friends."
        });
      });
  };