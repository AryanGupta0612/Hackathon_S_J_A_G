const express = require("express");
const router = express.Router();

const notices = [
  "Vaccination camp on 20th Jan",
  "Free health checkup this Sunday",
  "Dengue awareness drive ongoing"
];

router.get("/", (req, res) => {
  res.json(notices);
});

module.exports = router;
