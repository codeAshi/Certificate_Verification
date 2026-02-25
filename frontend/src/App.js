import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [certificate, setCertificate] = useState(null);
  const [searchId, setSearchId] = useState("");

  const [formData, setFormData] = useState({
    certificateId: "",
    studentName: "",
    internshipDomain: "",
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData
      );

      const userData = {
        token: res.data.token,
        role: res.data.role
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      alert("Login Successful ✅");
    } catch {
      alert("Login Failed ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const addCertificate = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/certificates/add",
        formData,
        {
          headers: {
            Authorization: user.token
          }
        }
      );
      alert("Certificate Added Successfully ✅");
    } catch {
      alert("Admin Only ❌");
    }
  };

  const searchCertificate = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/certificates/${searchId}`
      );
      setCertificate(res.data);
    } catch {
      setCertificate(null);
      alert("Certificate Not Found ❌");
    }
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <h2 className="text-center">Login</h2>
        <input
          className="form-control my-2"
          placeholder="Email"
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
        <input
          className="form-control my-2"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h3>Certificate Portal ({user.role})</h3>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {user.role === "admin" && (
        <div className="card p-3 my-4">
          <h5>Add Certificate</h5>
          <input className="form-control my-2" name="certificateId" placeholder="Certificate ID"
            onChange={(e)=>setFormData({...formData, certificateId:e.target.value})}/>
          <input className="form-control my-2" name="studentName" placeholder="Student Name"
            onChange={(e)=>setFormData({...formData, studentName:e.target.value})}/>
          <input className="form-control my-2" name="internshipDomain" placeholder="Domain"
            onChange={(e)=>setFormData({...formData, internshipDomain:e.target.value})}/>
          <input className="form-control my-2" name="startDate" placeholder="Start Date"
            onChange={(e)=>setFormData({...formData, startDate:e.target.value})}/>
          <input className="form-control my-2" name="endDate" placeholder="End Date"
            onChange={(e)=>setFormData({...formData, endDate:e.target.value})}/>
          <button className="btn btn-success w-100" onClick={addCertificate}>
            Add Certificate
          </button>
        </div>
      )}

      <div className="card p-3">
        <h5>Verify Certificate</h5>
        <input
          className="form-control my-2"
          placeholder="Enter Certificate ID"
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={searchCertificate}>
          Verify
        </button>

        {certificate && (
          <div className="alert alert-success mt-3">
            <p><strong>Name:</strong> {certificate.studentName}</p>
            <p><strong>Domain:</strong> {certificate.internshipDomain}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;