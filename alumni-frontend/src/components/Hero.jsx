import "./Hero.css";
import { Link } from "react-router-dom";
import logo from "../assets/images/yspm-logo.png";

function Hero() {
  return (
    <section className="hero" id="hero">

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <img
          src={logo}
          alt="YSPM Logo"
          className="hero-logo"
        />

        <h3>Yashoda Shikshan Prasarak Mandal's</h3>

        <h1>Yashoda Technical Campus</h1>

        <h2>College Alumni Portal</h2>

        <p>
          Connecting Students, Alumni &
          Career Opportunities
        </p>

        <div className="hero-buttons">

          <Link
            to="/login"
            className="hero-login"
          >
            Login
          </Link>

          <a
            href="#about"
            className="hero-explore"
          >
            Explore
          </a>

        </div>

      </div>

    </section>
  );
}

export default Hero;