const mongoose = require("mongoose");
const FormSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    egift_number: { type: Number, required: true, unique: true },
    email: { type: String, required: true },
    country: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", FormSchema);