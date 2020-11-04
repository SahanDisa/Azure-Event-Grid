const db = require("../models");
const Topic = db.topics;
const Op = db.Sequelize.Op;

// Create and Save a new Topic
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Topic
    const topic = {
      title: req.body.title,
      description: req.body.description,
      subscription: req.body.subscription,
      created: req.body.created ? req.body.created : false
    };
  
    // Save Topic in the database
    Topic.create(topic)
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

// Retrieve all Topics from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Topic.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving topics."
        });
      });
};

// Find a single Topic with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Topic.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Topic with id=" + id
        });
      });
  };

// Update a Topic by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Topic.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Topic was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Topic with id=${id}. Maybe Topic Source was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Topic with id=" + id
        });
      });
};

// Delete a Topic with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Topic.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Topic was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Topic with id=${id}. Maybe Topic was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Topic with id=" + id
        });
      });
};

// Delete all Topic from the database.
exports.deleteAll = (req, res) => {
    Topic.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Topics were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all topics."
        });
      });
  };

// Find all published Topics
exports.findAllCreated = (req, res) => {
    Topic.findAll({ where: { created: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving topics."
        });
      });
  };