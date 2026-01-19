const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["clinic", "phc", "government_hospital"],
    required: true
  },
  medicines: [String],
  location: String
});

module.exports = mongoose.model("Clinic", clinicSchema);
