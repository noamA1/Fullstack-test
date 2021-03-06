const Account = require("../models/account.model");

// Create and Save a new Account
exports.create = (req, res) => {
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

  // Create a Account
  const account = new Account({
    clientID: req.body.clientID,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    accountNumber: req.body.accountNumber,
    email: req.body.email,
    phoneNumber: !req.body.phoneNumber ? "" : req.body.phoneNumber,
  });

  // Save Account in the database
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

// Retrieve and return all accounts from the database.
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

// Find a single account with a account number
exports.findOne = (req, res) => {
  Account.find({ accountNumber: req.params.accountNumber })
    .then((account) => {
      if (account.length === 0) {
        return res.send({
          message: "Account not found with number " + req.params.accountNumber,
        });
      }
      res.send({
        message: `Account with number ${req.params.accountNumber} alredy exists`,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectNumber") {
        return res.status(404).send({
          message: "Account not found with number " + req.params.accountNumber,
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving account with number " + req.params.accountNumber,
      });
    });
};

// Update a account identified by the accountId in the request
exports.update = (req, res) => {
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

  // Find account and update it with the request body
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

// Delete a account with the specified accountId in the request
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
