import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'; 
import { login } from '../Store/UserSlice'; 
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (data.success) {
       
        dispatch(login({
          user: data.user,
          purchasedCourses: data.purchasedCourses || []
        }));

        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful!");
        navigate("/courses");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Network error");
    }

  }
  return (
    <div className="container-xxl py-2 mt-4">
      <div className="container">
        <div className="row g-4">
          <center>
            <div className="login-container">
              <div className="login-box">
                <h2>Hi, Welcome back!</h2>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleLogin}>
                  <input
                    type="text"
                    placeholder="Username or Email Address"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

      <div className="login-options">
  <label className="remember-me">
    <input type="checkbox" />   <span>Keep me signed in</span>
 
  </label>

  <a href="#" className="forgot-password">Forgot Password?</a>
</div>


                  <button className="btn"  type="submit">Sign In</button>

                  <p className="register-text">
                    Don't have an account? <Link to="/register">Register Now</Link>
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

export default Login;