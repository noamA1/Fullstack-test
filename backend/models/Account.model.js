const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema(
  {
    clientID: String,
    firstName: String,
    lastName: String,
    accountNumber: Number,
    phoneNumber: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", AccountSchema);
