const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateUserProfile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

//  PUBLIC ROUTES (NO protect here)
router.post("/register", registerUser);
router.post("/login", loginUser);

//  PRIVATE ROUTES (protect FIRST)
router.get("/profile", protect, getProfile);
router.put("/me", protect, updateUserProfile);

module.exports = router;
