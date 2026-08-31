import { Link } from "react-router-dom";
import logo from "../assets/images/yspm-logo.png";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-logo">

        <img src={logo} alt="YTC Logo" />

        <div>
          <h2>YTC Alumni</h2>
          <span>Connect • Network • Grow</span>
        </div>

      </div>

      <ul className="nav-links">

        <li><a href="#hero">Home</a></li>

        <li><a href="#about">About</a></li>

        <li><a href="#features">Features</a></li>

        <li><a href="#gallery">Gallery</a></li>

        <li><a href="#success">Success</a></li>

        <li><a href="#jobs">Jobs</a></li>

         <li><a href="#events">Events</a></li>

        <li><a href="#contact">Contact</a></li>

      </ul>

      <div className="nav-buttons">

        <Link to="/login" className="login-btn-nav">
          Login
        </Link>

        <Link to="/register" className="register-btn-nav">
          Register
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;