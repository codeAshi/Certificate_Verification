import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  // 🔹 AUTH STATE
  const [mode, setMode] = useState("user");
  const [loggedIn, setLoggedIn] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // 🔹 USER DASHBOARD STATE (MOVE HERE)
  const [section, setSection] = useState("dashboard");
  const [certificateForm, setCertificateForm] = useState({
    certificateId: "",
    studentName: "",
    internshipDomain: "",
    startDate: "",
    endDate: ""
  });

  const [searchId, setSearchId] = useState("");
  const [certificate, setCertificate] = useState(null);
   const [adminSection, setAdminSection] = React.useState("dashboard");
  const [users, setUsers] = React.useState([]);
  const [certificates, setCertificates] = React.useState([]);

  
  /* ================= HANDLE LOGIN ================= */
const handleSubmit = async () => {
  try {

    // 🔹 REGISTER
    if (mode === "register") {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          ...formData,
          role: "user"
        }
      );

      alert("Registration Successful ✅");

      setMode("user");

      setFormData({
        name: "",
        email: formData.email,
        password: ""
      });

      return;
    }

    // 🔹 LOGIN
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email: formData.email,
        password: formData.password
      }
    );

    if (res.data.role !== mode) {
      alert(`Please login using ${res.data.role} section ❌`);
      return;
    }

    // ✅ Save token
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    // ✅ Set login state
    setLoggedIn(res.data.role);

    alert(`${res.data.role.toUpperCase()} Login Successful ✅`);

  } catch (error) {
    alert("Operation Failed ❌");
  }
};
  /* ================= DASHBOARDS ================= */

  if (loggedIn === "user") {
  
  const addCertificate = async () => {
  try {

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/certificates/add",
      certificateForm,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Certificate Added ✅");

  } catch (err) {
    console.log(err.response?.data);
    alert("Failed to add certificate ❌");
  }
};
  const searchCertificate = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/certificates/${searchId}`
      );
      setCertificate(res.data);
    } catch {
      alert("Certificate Not Found ❌");
      setCertificate(null);
    }
  };

  const downloadCertificate = () => {
    window.open(
      `http://localhost:5000/api/certificates/download/${searchId}`
    );
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="bg-primary text-white p-3"
        style={{ width: "230px", minHeight: "100vh" }}
      >
        <h4>User Panel</h4>
        <hr />

        <button
          className="btn btn-link text-white w-100 text-start"
          onClick={() => setSection("dashboard")}
        >
          Dashboard
        </button>

        <button
          className="btn btn-link text-white w-100 text-start"
          onClick={() => setSection("add")}
        >
          Add Certificate
        </button>

        <button
          className="btn btn-link text-white w-100 text-start"
          onClick={() => setSection("search")}
        >
          Search Certificate
        </button>

        <button
          className="btn btn-link text-danger w-100 text-start mt-4"
          onClick={() => setLoggedIn(null)}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="container p-4">

        {section === "dashboard" && (
          <div className="card p-4 shadow">
            <h3>Welcome User 👋</h3>
            <p>
              Use sidebar to manage and verify certificates.
            </p>
          </div>
        )}

        {section === "add" && (
          <div className="card p-4 shadow">
            <h4>Add Certificate</h4>

            <input className="form-control mb-3"
              placeholder="Certificate ID"
              onChange={(e) =>
                setFormData({ ...formData, certificateId: e.target.value })
              }
            />

            <input className="form-control mb-3"
              placeholder="Student Name"
              onChange={(e) =>
                setFormData({ ...formData, studentName: e.target.value })
              }
            />

            <input className="form-control mb-3"
              placeholder="Internship Domain"
              onChange={(e) =>
                setFormData({ ...formData, internshipDomain: e.target.value })
              }
            />

            <input type="date" className="form-control mb-3"
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
            />

            <input type="date" className="form-control mb-3"
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
            />

            <button
              className="btn btn-success"
              onClick={addCertificate}
            >
              Submit
            </button>
          </div>
        )}

        {section === "search" && (
          <div className="card p-4 shadow">
            <h4>Search Certificate</h4>

            <input
              className="form-control mb-3"
              placeholder="Enter Certificate ID"
              onChange={(e) => setSearchId(e.target.value)}
            />

            <button
              className="btn btn-primary me-2"
              onClick={searchCertificate}
            >
              Search
            </button>

            {certificate && (
              <div className="mt-4 alert alert-success">
                <p><strong>Name:</strong> {certificate.studentName}</p>
                <p><strong>Domain:</strong> {certificate.internshipDomain}</p>

                <button
                  className="btn btn-dark mt-2"
                  onClick={downloadCertificate}
                >
                  Download Certificate
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

if (loggedIn === "admin") {

 
  const token = localStorage.getItem("token");

 const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/admin/users",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setUsers(res.data);

  } catch (err) {
    alert("Failed to load users ❌");
  }
};

  const fetchCertificates = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/certificates",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setCertificates(res.data);
    } catch {
      alert("Failed to load certificates ❌");
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{ width: "230px", minHeight: "100vh" }}
      >
        <h4>Admin Panel 👑</h4>
        <hr />

        <button
          className="btn btn-link text-white w-100 text-start"
          onClick={() => setAdminSection("dashboard")}
        >
          Dashboard
        </button>

        <button
          className="btn btn-link text-white w-100 text-start"
          onClick={() => {
            setAdminSection("users");
            fetchUsers();
          }}
        >
          Manage Users
        </button>

        <button
          className="btn btn-link text-white w-100 text-start"
          onClick={() => {
            setAdminSection("certificates");
            fetchCertificates();
          }}
        >
          Certificates
        </button>

        <button
          className="btn btn-link text-danger w-100 text-start mt-4"
          onClick={() => setLoggedIn(null)}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="container p-4">

        {adminSection === "dashboard" && (
          <div className="card p-4 shadow">
            <h3>Welcome Admin 👑</h3>
            <p>Use sidebar to manage users and certificates.</p>
          </div>
        )}

        {adminSection === "users" && (
          <div className="card p-4 shadow">
            <h4>All Users</h4>
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={
                        u.role === "admin"
                          ? "badge bg-danger"
                          : "badge bg-primary"
                      }>
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {adminSection === "certificates" && (
          <div className="card p-4 shadow">
            <h4>All Certificates</h4>

            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Certificate ID</th>
                  <th>Student</th>
                  <th>Domain</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((c) => (
                  <tr key={c._id}>
                    <td>{c.certificateId}</td>
                    <td>{c.studentName}</td>
                    <td>{c.internshipDomain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
  /* ================= LOGIN / REGISTER UI ================= */

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card p-4 shadow">
        <h3 className="text-center mb-4">
          🎓 Certificate Portal
        </h3>

        {/* MODE BUTTONS */}
        <div className="d-flex justify-content-between mb-4">
          <button
            className={`btn ${mode === "user" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setMode("user")}
          >
            User
          </button>

          <button
            className={`btn ${mode === "admin" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setMode("admin")}
          >
            Admin
          </button>

          <button
            className={`btn ${mode === "register" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {/* NAME FIELD (REGISTER ONLY) */}
       {mode === "register" && (
  <input
    type="text"
    placeholder="Full Name"
    onChange={(e) =>
      setFormData({ ...formData, name: e.target.value })
    }
  />
)}
         

        {/* EMAIL */}
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button
          className={`btn w-100 ${
            mode === "admin"
              ? "btn-dark"
              : mode === "register"
              ? "btn-success"
              : "btn-primary"
          }`}
          onClick={handleSubmit}
        >
          {mode === "register"
            ? "Register"
            : mode === "admin"
            ? "Admin Login"
            : "User Login"}
        </button>
      </div>
    </div>
  );
}

export default App;