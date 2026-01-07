const express = require("express");
const router = express.Router();

const {
  exportAsPDF,
  exportAsDocument,
} = require("../controllers/exportController");

const protect = require("../middleware/authMiddleware");

// APPLY AUTH MIDDLEWARE
router.use(protect);

// EXPORT ROUTES
router.get("/pdf/:id", exportAsPDF);
router.get("/docx/:id", exportAsDocument);

module.exports = router;
