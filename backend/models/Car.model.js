const mongoose = require("mongoose");

const CarSchema = mongoose.Schema(
  {
    model: Number,
    color: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", CarSchema);
