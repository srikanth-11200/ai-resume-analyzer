const express = require("express");
const router = express.Router();
const { analyzeResume } = require("../controllers/resumeController");
const upload = require("../utils/multerConfig");

router.post("/analyze-resume", upload.single("resume"), analyzeResume);

module.exports = router;
