const XLSX = require("xlsx");
const fs = require("fs");
const Certificate = require("../models/Certificate");

// BULK EXCEL UPLOAD
exports.bulkUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];

    const data = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );

    for (const row of data) {
      await Certificate.create({
        certificateId: row.certificateId,
        studentName: row.studentName,
        internshipDomain: row.internshipDomain,
        startDate: row.startDate,
        endDate: row.endDate
      });
    }

    fs.unlinkSync(req.file.path); // delete temp file

    res.json({ message: "Bulk upload successful" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Upload failed" });
  }
};