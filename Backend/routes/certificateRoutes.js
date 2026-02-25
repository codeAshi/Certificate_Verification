const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// 🔐 Add Certificate (Admin Only)
router.post("/add", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const newCertificate = new Certificate(req.body);
    await newCertificate.save();
    res.json({ message: "Certificate Added Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error Adding Certificate" });
  }
});

// 🔍 Search Certificate (Public)
router.get("/:id", async (req, res) => {
  try {
    const cert = await Certificate.findOne({
      certificateId: req.params.id,
    });

    if (cert) {
      res.json(cert);
    } else {
      res.status(404).json({ message: "Certificate Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error Searching Certificate" });
  }
});

module.exports = router;