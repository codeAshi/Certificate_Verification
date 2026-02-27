const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const Certificate = require("../models/Certificate");
const { verifyToken } = require("../middleware/authMiddleware");

// 🔐 Add Certificate (Admin Only)
router.post("/add", verifyToken, async (req, res) => {
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
router.get("/download/:id", verifyToken, async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      certificateId: req.params.id
    });

    if (!certificate)
      return res.status(404).json({ message: "Certificate not found" });

    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margin: 50
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=certificate-${certificate.certificateId}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    /* ===== Design Code Here ===== */

    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
       .lineWidth(4)
       .stroke("#2563eb");

    doc
      .fontSize(38)
      .text("CERTIFICATE OF INTERNSHIP", { align: "center" });

    doc.moveDown(2);

    doc
      .fontSize(28)
      .fillColor("#2563eb")
      .text(certificate.studentName, { align: "center" });

    doc.moveDown();

    doc
      .fontSize(20)
      .fillColor("black")
      .text(
        `Internship Domain: ${certificate.internshipDomain}`,
        { align: "center" }
      );

    doc.moveDown();

    doc
      .text(
        `From ${certificate.startDate} To ${certificate.endDate}`,
        { align: "center" }
      );

    doc.end();

  } catch (error) {
    res.status(500).json({ message: "PDF generation failed" });
  }
});

module.exports = router;