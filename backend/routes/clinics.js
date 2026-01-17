const express = require("express");
const router = express.Router();

const clinics = [
  {
    id: 1,
    name: "Village Clinic",
    medicines: ["Paracetamol", "ORS"]
  },
  {
    id: 2,
    name: "Primary Health Center",
    medicines: ["Antibiotics", "Insulin"]
  },
  {
    id: 3,
    name: "District Hospital",
    medicines: ["Emergency Care"]
  }
];

router.get("/", (req, res) => {
  res.json(clinics);
});

module.exports = router;
