const Account = require("../models/account.model");

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.clientID) {
    return res.status(400).send({
      message: "ID can not be empty",
    });
  } else if (!req.body.firstName) {
    return res.status(400).send({
      message: "First Name can not be empty",
    });
  } else if (!req.body.lastName) {
    return res.status(400).send({
      message: "last Name can not be empty",
    });
  } else if (!req.body.accountNumber) {
    return res.status(400).send({
      message: "Account Number can not be empty",
    });
  }

  // Create a Note
  const account = new Account({
    clientID: req.body.clientID,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    accountNumber: req.body.accountNumber,
    email: req.body.email,
    phoneNumber: !req.body.phoneNumber ? "" : req.body.phoneNumber,
  });
  // console.log(req.);

  // Save Note in the database
  account
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Account.",
      });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Account.find()
    .then((accounts) => {
      res.send(accounts);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving accounts.",
      });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Account.findById(req.params.accountId)
    .then((account) => {
      if (!account) {
        return res.status(404).send({
          message: "Account not found with id " + req.params.accountId,
        });
      }
      res.send(account);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Account not found with id " + req.params.accountId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving account with id " + req.params.accountId,
      });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.clientID) {
    return res.status(400).send({
      message: "ID can not be empty",
    });
  } else if (!req.body.firstName) {
    return res.status(400).send({
      message: "First Name can not be empty",
    });
  } else if (!req.body.lastName) {
    return res.status(400).send({
      message: "last Name can not be empty",
    });
  } else if (!req.body.accountNumber) {
    return res.status(400).send({
      message: "Account Number can not be empty",
    });
  }

  // Find note and update it with the request body
  Account.findByIdAndUpdate(
    req.params.accountId,
    {
      clientID: req.body.clientID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      accountNumber: req.body.accountNumber,
      email: req.body.email,
      phoneNumber: !req.body.phoneNumber ? "" : req.body.phoneNumber,
    },
    { new: true }
  )
    .then((account) => {
      if (!account) {
        return res.status(404).send({
          message: "Account not found with id " + req.params.accountId,
        });
      }
      res.send(account);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Account not found with id " + req.params.accountId,
        });
      }
      return res.status(500).send({
        message: "Error updating account with id " + req.params.accountId,
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Account.findByIdAndRemove(req.params.accountId)
    .then((account) => {
      if (!account) {
        return res.status(404).send({
          message: "Account not found with id " + req.params.accountId,
        });
      }
      res.send({ message: "account deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Account not found with id " + req.params.accountId,
        });
      }
      return res.status(500).send({
        message: "Could not delete account with id " + req.params.accountId,
      });
    });
};
