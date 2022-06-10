const mongoose = require("mongoose");

const OperationSchema = mongoose.Schema(
  {
    accountNumber: Number,
    type: String,
    amount: Number,
    interest: Number,
    payments: Number,
    operationDate: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Operation", OperationSchema);
