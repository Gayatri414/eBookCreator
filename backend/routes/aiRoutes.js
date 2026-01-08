const express = require("express");
const router = express.Router();

const {
  generateOutline,
  generateChapterContent,
} = require("../controllers/aiController");

const protect = require("../middleware/authMiddleware.js");

//  AI routes (protected)
router.post("/generate-outline", protect, generateOutline);
router.post("/generate-chapter-content", generateChapterContent);

module.exports = router;
