import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EnvelopeFill,
  LockFill,
  Eye,
  EyeSlash,
  CheckCircleFill,
} from "react-bootstrap-icons";

import API from "../../api/axios";
import logo from "../../assets/images/yspm-logo.png";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await API.post(
        "accounts/login/",
        formData
      );

      localStorage.setItem(
        "access",
        response.data.access
      );

      localStorage.setItem(
        "refresh",
        response.data.refresh
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
        })
      );

     if (response.data.role === "student") {
        navigate("/student/dashboard");
      }
      else if (response.data.role === "alumni") {
        navigate("/alumni/dashboard");
      }
      else if (response.data.role === "admin") {
        navigate("/admin/dashboard");
      }

    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="overlay"></div>

      <div className="login-container">

        {/* Left Section */}

        <div className="login-left">

          <div className="college-header">

            <img
              src={logo}
              alt="YSPM Logo"
              className="logo"
            />

            <div className="college-text">

              <p className="college-group">
                Yashoda Shikshan Prasarak Mandal's
              </p>

              <h1 className="college-name">
                Yashoda Technical Campus, Satara
              </h1>

              <h2 className="portal-title">
                Alumni Portal
              </h2>

            </div>

          </div>

          <p className="tagline">
            Connect • Network • Grow
          </p>

          <div className="feature-list">

            <div className="feature-item">
              <CheckCircleFill className="feature-icon" />
              <span>Connect with Alumni</span>
            </div>

            <div className="feature-item">
              <CheckCircleFill className="feature-icon" />
              <span>Find Jobs & Internships</span>
            </div>

            <div className="feature-item">
              <CheckCircleFill className="feature-icon" />
              <span>Participate in Events</span>
            </div>

            <div className="feature-item">
              <CheckCircleFill className="feature-icon" />
              <span>Earn Reward Points</span>
            </div>

          </div>

        </div>
        {/* Right Section */}

        <div className="login-right">

          <div className="login-card">

            <h3>Welcome Back 👋</h3>

            <p className="login-subtitle">
              Login to continue
            </p>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <label>Email Address</label>

              <div className="input-box">

                <EnvelopeFill className="input-icon" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <label>Password</label>

              <div className="input-box">

                <LockFill className="input-icon" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeSlash />
                  ) : (
                    <Eye />
                  )}
                </button>

              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading
                  ? "Logging In..."
                  : "Login"}
              </button>

            </form>

            <p className="register-text">

              Don't have an account?

              <Link
                to="/register"
                className="register-link"
              >
                Register
              </Link>

            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;