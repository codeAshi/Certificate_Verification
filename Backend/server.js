const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Ashish:Ashish3204@cluster0.fc6idkv.mongodb.net/certificatesDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
const authRoutes = require("./routes/AuthRoutes");
app.use("/api/auth", authRoutes);

const certificateRoutes = require("./routes/certificateRoutes");
app.use("/api/certificates", certificateRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});