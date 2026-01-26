const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["hospital", "clinic", "phc"],
    required: true,
  },
  location: {
    type: String,
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  medicines: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Clinic", clinicSchema);
