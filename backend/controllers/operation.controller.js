const Operation = require("../models/operation.model");

// Create and Save a new Operation
exports.create = (req, res) => {
  // Validate request
  if (!req.body.accountNumber) {
    return res.status(400).send({
      message: "Account Number can not be empty",
    });
  } else if (!req.body.type) {
    return res.status(400).send({
      message: "Type can not be empty",
    });
  } else if (!req.body.amount) {
    return res.status(400).send({
      message: "Amount can not be empty",
    });
  }

  // Create a Operation
  const operation = new Operation({
    accountNumber: req.body.accountNumber,
    type: req.body.type,
    amount: req.body.amount,
    operationDate: req.body.operationDate,
  });
  if (req.body.type === "loan") {
    operation.payments = req.body.payments;
    operation.interest = req.body.interest;
  }

  // Save Operation in the database
  operation
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the operation.",
      });
    });
};

// Retrieve and return all operations from the database.
exports.findAll = (req, res) => {
  Operation.find()
    .then((operations) => {
      res.send(operations);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving operations.",
      });
    });
};

// Find a single operation with a operationId
exports.findOne = (req, res) => {
  Operation.findById(req.params.operationId)
    .then((operation) => {
      if (!operation) {
        return res.status(404).send({
          message: "operation not found with id " + req.params.operationId,
        });
      }
      res.send(operation);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Operation not found with id " + req.params.operationId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving operation with id " + req.params.operationId,
      });
    });
};
