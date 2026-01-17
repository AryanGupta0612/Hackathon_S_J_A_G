const express = require("express");
const router = express.Router();

router.post("/check", (req, res) => {
  const { symptom } = req.body;

  let advice = "Consult a clinic";

  if (!symptom) {
    return res.json({ advice });
  }

  const s = symptom.toLowerCase();

  if (s.includes("fever")) advice = "Visit nearby clinic";
  else if (s.includes("pain")) advice = "Home care recommended";
  else if (s.includes("breathing")) advice = "Emergency! Go to hospital";

  res.json({ advice });
});

module.exports = router;
