const Operation = require("../models/operation.model");

// Create and Save a new Note
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
      message: "amount can not be empty",
    });
  }
  // else if (!req.body.operationDate) {
  //   return res.status(400).send({
  //     message: "Operation Date can not be empty",
  //   });
  // }

  // Create a Note
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

  // Save Note in the database
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

// Retrieve and return all notes from the database.
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

// Find a single note with a noteId
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

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
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
      message: "amount can not be empty",
    });
  } else if (!req.body.operationDate) {
    return res.status(400).send({
      message: "Operation Date can not be empty",
    });
  }
  if (!req.body.type === "loan") {
    if (!req.body.payments) {
      return res.status(400).send({
        message: "payments can not be empty",
      });
    }
    if (!req.body.interest) {
      return res.status(400).send({
        message: "interest can not be empty",
      });
    }
  }

  // Find note and update it with the request body
  Operation.findByIdAndUpdate(
    req.params.operationId,
    {
      accountNumber: req.body.accountNumber,
      type: req.body.type,
      amount: req.body.amount,
      operationDate: req.body.operationDate,
    },
    { new: true }
  )
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
          message: "operation not found with id " + req.params.operationId,
        });
      }
      return res.status(500).send({
        message: "Error updating operation with id " + req.params.operationId,
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Operation.findByIdAndRemove(req.params.operationId)
    .then((operation) => {
      if (!operation) {
        return res.status(404).send({
          message: "Operation not found with id " + req.params.operationId,
        });
      }
      res.send({ message: "operation deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Operation not found with id " + req.params.operationId,
        });
      }
      return res.status(500).send({
        message: "Could not delete operation with id " + req.params.operationId,
      });
    });
};
