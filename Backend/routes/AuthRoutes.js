const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET_KEY = "supersecretkey";

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default role logic
    const userRole = role === "admin" ? "admin" : "user";

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole
    });

    return res.status(201).json({
      message: "User Registered Successfully"
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({
      message: "Registration Failed"
    });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password required"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User Not Found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token,
      role: user.role,
      name: user.name
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      message: "Login Failed"
    });
  }
});

module.exports = router;