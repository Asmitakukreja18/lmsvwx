import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StudentRegistration.css";

const StudentRegistration = () => {
  const [form, setForm] = useState({
    firstName: "", lastName: "", username: "", email: "", password: "", confirm: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (data.success) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="container-xxl py-2 mt-4">
      <div className="container">
        <div className="row g-4">
          <center>
            <div className="register-container">
              <div className="register-box">
                <h2>Create Your Account</h2>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleRegister}>
                  <label>First Name</label>
                  <input name="firstName" type="text" placeholder="First Name" onChange={handleChange} required />

                  <label>Last Name</label>
                  <input name="lastName" type="text" placeholder="Last Name" onChange={handleChange} required />

                  <label>User Name</label>
                  <input name="username" type="text" placeholder="User Name" onChange={handleChange} required />

                  <label>E-Mail</label>
                  <input name="email" type="email" placeholder="E-Mail" onChange={handleChange} required />

                  <label>Password</label>
                  <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

                  <label>Password confirmation</label>
                  <input name="confirm" type="password" placeholder="Password Confirmation" onChange={handleChange} required />

                  <button className="btn"  type="submit">Register</button>

                  <p className="login-text">
                    Already have an account? <Link to="/login">Login Now</Link>
                  </p>
                </form>
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;