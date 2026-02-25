const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");

// Add Certificate (Admin Upload)
router.post("/add", async (req, res) => {
    const newCertificate = new Certificate(req.body);
    await newCertificate.save();
    res.json({ message: "Certificate Added Successfully" });
});

// Search Certificate by ID
router.get("/:id", async (req, res) => {
    const cert = await Certificate.findOne({ certificateId: req.params.id });
    if (cert) {
        res.json(cert);
    } else {
        res.status(404).json({ message: "Certificate Not Found" });
    }
});

module.exports = router;