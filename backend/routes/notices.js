const express = require("express");
const Notice = require("../models/Notice");

const router = express.Router();

// Get notices
router.get("/", async (req, res) => {
  const notices = await Notice.find().sort({ date: -1 });
  res.json(notices);
});

// Add notice
router.post("/", async (req, res) => {
  const notice = new Notice(req.body);
  await notice.save();
  res.json(notice);
});

module.exports = router;
