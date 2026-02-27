import React, { useState, useEffect } from "react";
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
  //Dashboard Information
const [stats, setStats] = React.useState({
  totalUsers: 0,
  totalAdmins: 0,
  totalCertificates: 0
});
  // ✅ FUNCTIONS
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/stats",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setStats(res.data);

    } catch (err) {
      console.log(err);
    }
  };
// ✅ useEffect MUST BE HERE
  useEffect(() => {
    if (loggedIn === "admin") {
      fetchStats();
    }
  }, [loggedIn]);
  /* ================= HANDLE LOGIN ================= */
const handleSubmit = async () => {
  try {

   // 🔹 REGISTER
if (mode === "register-user" || mode === "register-admin") {

  const role =
    mode === "register-admin" ? "admin" : "user";

  await axios.post(
    "http://localhost:5000/api/auth/register",
    {
      ...formData,
      role: role   // ✅ dynamic role
    }
  );

  alert(`${role.toUpperCase()} Registration Successful ✅`);

  setMode(role); // switch to login mode
  setFormData({
    name: "",
    email: "",
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

  const downloadCertificate = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:5000/api/certificates/download/${searchId}`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`  // VERY IMPORTANT
        }
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `certificate-${searchId}.pdf`);
    document.body.appendChild(link);
    link.click();

  } catch (error) {
    alert("Download Failed ❌");
  }
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

                  <input
              className="form-control mb-3"
              placeholder="Certificate ID"
              onChange={(e) =>
                setCertificateForm({
                  ...certificateForm,
                  certificateId: e.target.value
                })
              }
            />

            <input
              className="form-control mb-3"
              placeholder="Student Name"
              onChange={(e) =>
                setCertificateForm({
                  ...certificateForm,
                  studentName: e.target.value
                })
              }
            />

            <input
              className="form-control mb-3"
              placeholder="Internship Domain"
              onChange={(e) =>
                setCertificateForm({
                  ...certificateForm,
                  internshipDomain: e.target.value
                })
              }
            />

            <input
              type="date"
              className="form-control mb-3"
              onChange={(e) =>
                setCertificateForm({
                  ...certificateForm,
                  startDate: e.target.value
                })
              }
            />

            <input
              type="date"
              className="form-control mb-3"
              onChange={(e) =>
                setCertificateForm({
                  ...certificateForm,
                  endDate: e.target.value
                })
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
  const handleBulkUpload = async (file) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(
      "http://localhost:5000/api/admin/bulk-upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    alert("Bulk Upload Successful ✅");
    fetchStats();
  }catch (error) {
  console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);
  alert("Upload Failed ❌");
}
};

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
  const fetchStats = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/admin/stats",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setStats(res.data);
  } catch {
    alert("Failed to load stats ❌");
  }
};
  const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/admin/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchUsers(); // refresh table

  } catch (err) {
    console.log(err.response?.data);
    alert("Delete Failed ❌");
  }
};

const deleteCertificate = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/admin/certificates/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchCertificates(); // refresh table

  } catch (err) {
    console.log(err.response?.data);
    alert("Delete Failed ❌");
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
         onClick={() => {
  setAdminSection("dashboard");
  fetchStats();
}}
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
  <div className="row g-4 mt-3">

  <div className="col-md-4">
    <div className="premium-card users-card">
      <div className="card-content">
        <div>
          <p>Total Users</p>
          <h2>{stats.totalUsers}</h2>
        </div>
        <div className="card-icon">👥</div>
      </div>
      <div className="card-glow"></div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="premium-card admins-card">
      <div className="card-content">
        <div>
          <p>Total Admins</p>
          <h2>{stats.totalAdmins}</h2>
        </div>
        <div className="card-icon">👑</div>
      </div>
      <div className="card-glow"></div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="premium-card cert-card">
      <div className="card-content">
        <div>
          <p>Total Certificates</p>
          <h2>{stats.totalCertificates}</h2>
        </div>
        <div className="card-icon">📄</div>
      </div>
      <div className="card-glow"></div>
    </div>
  </div>{/* CENTER BULK SECTION */}
<div className="d-flex flex-column align-items-center mt-5">

  {/* BIG UPLOAD BUTTON */}
  <label
    style={{
      padding: "18px 45px",
      background: "linear-gradient(to right, #4e8ccf, #7b3fa0)",
      color: "white",
      fontSize: "18px",
      borderRadius: "12px",
      cursor: "pointer",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }}
  >
    📤 Upload Bulk Certificates

    <input
      type="file"
      accept=".xlsx,.xls"
      hidden
      onChange={(e) =>
        handleBulkUpload(e.target.files[0])
      }
    />
  </label>

  {/* FORMAT CARD */}
  <div
    className="card mt-4 p-4 shadow"
    style={{
      width: "100%",
      maxWidth: "650px"
    }}
  >
    <h6 className="mb-3">📄 Excel Format Required</h6>

    <div className="table-responsive">
      <table className="table table-bordered text-center table-sm">
        <thead className="table-dark">
          <tr>
            <th>certificateId</th>
            <th>studentName</th>
            <th>internshipDomain</th>
            <th>startDate</th>
            <th>endDate</th>
          </tr>
        </thead>
      </table>
    </div>

    <small className="text-muted">
      ⚠️ Column names must match exactly (case-sensitive).
    </small>
  </div>

</div>
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
                  <th>Action</th>
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
                    
                    <td>
          
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteUser(u._id)}
        >
          Delete
        </button>
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
                  <th>Action</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((c) => (
                  <tr key={c._id}>
                    <td>{c.certificateId}</td>
                    <td>{c.studentName}</td>
                    <td>{c.internshipDomain}</td>
                    <td>
  <button
    className="btn btn-danger btn-sm"
    onClick={() => deleteCertificate(c._id)}
  >
    Delete
  </button>
</td>
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
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #4e8ccf, #7b3fa0)",
    }}
  >
    <div
      style={{
        width: "400px",
        background: "#e6e6e6",
        padding: "40px 30px",
        borderRadius: "15px",
        textAlign: "center",
      }}
    >
      <h2 className="mb-4">Login</h2>

      {/* USER / ADMIN SELECT */}
      <div className="d-flex justify-content-center gap-4 mb-4">
        <button
          className={`btn ${
            mode === "user" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setMode("user")}
        >
          User
        </button>

        <button
          className={`btn ${
            mode === "admin" ? "btn-dark" : "btn-outline-dark"
          }`}
          onClick={() => setMode("admin")}
        >
          Admin
        </button>
      </div>

      {/* REGISTER NAME FIELD */}
   {/* REGISTER NAME FIELD */}
{(mode === "register-user" || mode === "register-admin") && (
  <input
    type="text"
    placeholder="Full Name"
    className="form-control mb-3"
    style={{
      border: "none",
      borderBottom: "2px solid gray",
      background: "transparent",
    }}
    onChange={(e) =>
      setFormData({ ...formData, name: e.target.value })
    }
  />
)}
      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email"
        className="form-control mb-3"
        style={{
          border: "none",
          borderBottom: "2px solid gray",
          background: "transparent",
        }}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        className="form-control mb-4"
        style={{
          border: "none",
          borderBottom: "2px solid gray",
          background: "transparent",
        }}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />

      {/* LOGIN BUTTON */}
      <button
        style={{
          width: "100%",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          background: "linear-gradient(to right, #4e8ccf, #7b3fa0)",
          color: "white",
          fontSize: "16px",
          marginBottom: "15px",
        }}
        onClick={handleSubmit}
      >
      {mode === "admin"
  ? "Admin Login"
  : mode === "register-admin"
  ? "Register Admin"
  : mode === "register-user"
  ? "Register User"
  : "User Login"}
      </button>

      {/* CREATE OPTIONS */}
      {/* CREATE OPTIONS */}
<div className="d-flex justify-content-between">
  <span
    style={{ cursor: "pointer", color: "#4e8ccf" }}
    onClick={() => setMode("register-user")}
  >
    Create New User
  </span>

  <span
    style={{ cursor: "pointer", color: "#4e8ccf" }}
    onClick={() => setMode("register-admin")}
  >
    Create New Admin
  </span>
</div>
    </div>
  </div>
);
}
export default App;