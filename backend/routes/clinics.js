const express = require("express");
const Clinic = require("../models/Clinic");

const router = express.Router();

// Get all clinics
router.get("/", async (req, res) => {
  const clinics = await Clinic.find({});
  res.json(clinics);
});

// Add a clinic
router.post("/", async (req, res) => {
  const clinic = new Clinic(req.body);
  await clinic.save();
  res.json(clinic);
});

module.exports = router;
