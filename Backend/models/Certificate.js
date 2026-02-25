const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
    certificateId: String,
    studentName: String,
    internshipDomain: String,
    startDate: String,
    endDate: String
});

module.exports = mongoose.model("Certificate", certificateSchema);