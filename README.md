🎓 Blockchain-Based Certificate Verification System

⚠️ WORK IN PROGRESS

This project is currently under active development.
Features, UI design, APIs, and structure may change.
Some modules may be incomplete or under improvement.

📌 Overview

A full-stack MERN-based web application for secure certificate issuance and verification.

The system enables:

👑 Admin authentication

📂 Bulk certificate upload via Excel

🔎 Instant certificate verification

🏷 Unique certificate ID generation

🛡 Secure role-based access

The project is continuously being improved with better UI/UX, stronger security, and optimized performance.

⚙️ System Requirements

Before running the project, ensure your system has:

✅ Node.js

✅ npm

✅ MongoDB (Local) or MongoDB Atlas account

✅ Git (Optional but recommended)

🚀 How to Run the Project
🔹 1️⃣ Setup Backend

Open terminal and go to backend folder:

cd Backend

Install dependencies:

npm install

Start backend server:

node server.js

You should see:

Server running on port 5000
MongoDB connected
🔹 2️⃣ Setup Frontend

Open a new terminal.

Go to frontend folder:

cd frontend

Install dependencies:

npm install

Start React app:

npm start

Application will run on:

http://localhost:3000
✨ Features

🔐 Admin Authentication System

📂 Bulk Certificate Upload via Excel

🏷 Unique Certificate ID Generation

🔎 Instant Certificate Verification

📦 MongoDB Integration

🌐 Responsive React UI

🛡 Protected Backend Routes (JWT)

🎨 UI Enhancements (In Progress)

Currently improving:

✅ Cleaner Admin Dashboard Layout

✅ Modern Card-Based Certificate Display

🔄 Improved Mobile Responsiveness

🔄 Better Form Validation UI

🔄 Enhanced Alerts & Loading Indicators

🔄 Improved Typography & Color System

🚀 Upcoming Features

🌙 Dark / Light Mode Toggle

📱 QR Code Based Verification

✨ Smooth Animations & Transitions

📊 Admin Analytics Dashboard

🧾 Certificate PDF Redesign

🏗️ Tech Stack
🔹 Frontend

React.js

Axios

Bootstrap / Custom CSS

🔹 Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

🔹 Tools

Git & GitHub

Postman (API Testing)

📄 Excel Format for Bulk Upload

Excel file must include the following headers exactly:

| certificateId | studentName | internshipDomain | startDate | endDate |

⚠️ Column names are case-sensitive.

📁 Project Structure
certificate-verificatiom/
│
├── Backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
👨‍💻 Author

Ashish Bedare
B.Tech Computer Engineering

⭐ Support

If you like this project:

Give it a ⭐ on GitHub!
