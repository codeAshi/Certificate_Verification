import React, { useState } from "react";
import axios from "axios";

function Login({ setAdmin }) {
  const [data, setData] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );

      if (res.data.role !== "admin") {
        alert("Admin Only ❌");
        return;
      }

      localStorage.setItem("admin", JSON.stringify(res.data));
      setAdmin(res.data);
    } catch {
      alert("Login Failed ❌");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-3">Admin Login</h3>
      <input
        className="form-control my-2"
        placeholder="Email"
        onChange={(e) =>
          setData({ ...data, email: e.target.value })
        }
      />
      <input
        type="password"
        className="form-control my-2"
        placeholder="Password"
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />
      <button className="btn btn-dark w-100" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;