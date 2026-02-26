const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Certificate = require("../models/Certificate");

const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");


// ================= GET ALL USERS =================
router.get("/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


// ================= GET ALL CERTIFICATES =================
router.get("/certificates", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch {
    res.status(500).json({ message: "Failed to fetch certificates" });
  }
});


// ================= DELETE USER =================
router.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted Successfully" });
  } catch {
    res.status(500).json({ message: "Delete Failed" });
  }
});


// ================= DELETE CERTIFICATE =================
router.delete("/certificates/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: "Certificate Deleted Successfully" });
  } catch {
    res.status(500).json({ message: "Delete Failed" });
  }
});

module.exports = router;