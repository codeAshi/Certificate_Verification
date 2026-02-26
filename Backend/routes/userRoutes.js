const express = require("express");
const User = require("../models/User");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

/* Get All Users (Admin Only) */
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

/* Delete User (Admin Only) */
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User Deleted Successfully" });
});

/* Update Own Profile */
router.put("/update", verifyToken, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, req.body);
  res.json({ message: "Profile Updated Successfully" });
});

module.exports = router;