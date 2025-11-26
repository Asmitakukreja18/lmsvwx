import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Store/UserSlice";
import { loginUser } from "../api/Authapi";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser({ email, password });
      const data = res.data;

      if (data.message === "Login successful") {
        dispatch(
          login({
            user: data.student,
            purchasedCourses: data.student.purchasedCourses || [],
          })
        );

        localStorage.setItem("user", JSON.stringify(data.student));
        alert("Login successful!");
        navigate("/courses");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Network error");
    }
  };

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
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      <input type="checkbox" /> <span>Keep me signed in</span>
                    </label>
                    <a href="#" className="forgot-password">
                      Forgot Password?
                    </a>
                  </div>

                  <button className="btn" type="submit">
                    Sign In
                  </button>

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
