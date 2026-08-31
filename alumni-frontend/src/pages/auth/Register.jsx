import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PersonFill,
  EnvelopeFill,
  TelephoneFill,
  LockFill,
  EyeFill,
  EyeSlashFill,
  CheckCircleFill
} from "react-bootstrap-icons";

import API from "../../api/axios";
import logo from "../../assets/images/yspm-logo.png";
import "./Auth.css";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "student",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.phone.length !== 10) {
      setError("Phone number must be 10 digits.");
      return;
    }

    setLoading(true);

    try {
      await API.post("accounts/register/", {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
      });

      setSuccess("Registration Successful!");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {

      if (err.response?.data) {

        const errors = err.response.data;

        const firstError = Object.values(errors)[0];

        if (Array.isArray(firstError)) {
          setError(firstError[0]);
        } else {
          setError("Registration Failed");
        }

      } else {
        setError("Something went wrong.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Left Side */}

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
                Yashoda Technical Campus
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
              <span>Build Your Professional Network</span>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="login-right">

          <div className="login-card">

            <h2>Create Account</h2>

            <p className="login-subtitle">
              Register to continue
            </p>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="input-group">

                <PersonFill className="input-icon" />

                <input
                  type="text"
                  name="username"
                  placeholder="User Name"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="input-group">

                <EnvelopeFill className="input-icon" />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="input-group">

                <TelephoneFill className="input-icon" />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="input-box">

                <PersonFill className="input-icon" />

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-select"
                >

                  <option value="student">
                    Student
                  </option>

                  <option value="alumni">
                    Alumni
                  </option>

                </select>

              </div>

              <div className="input-box">

                <LockFill className="input-icon" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </button>

              </div>

              <div className="input-group">

                <LockFill className="input-icon" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <span
                  className="eye-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
                </span>

              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >

                {loading
                  ? "Creating Account..."
                  : "Register"}

              </button>

            </form>

            <p className="register-text">

              Already have an account?

              <Link to="/">
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;