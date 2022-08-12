const mongoose = require("mongoose");
const TableSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    win_check: { type: Number, required: true },
    multiplier: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Table", TableSchema);