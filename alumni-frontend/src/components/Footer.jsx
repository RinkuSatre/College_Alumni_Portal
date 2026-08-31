import {
  Facebook,
  Instagram,
  Linkedin,
  Github,
} from "react-bootstrap-icons";

import logo from "../assets/images/yspm-logo.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-about">

          <img src={logo} alt="YTC Logo" />

          <h3>YTC Alumni Portal</h3>

          <p>
            Connecting Students & Alumni for better
            career opportunities, networking and growth.
          </p>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="#hero">Home</a>

          <a href="#about">About</a>

          <a href="#jobs">Jobs</a>

          <a href="#events">Events</a>

          <a href="#contact">Contact</a>

        </div>

        <div className="footer-contact">

          <h3>Contact</h3>

          <p>📍 Satara, Maharashtra</p>

          <p>📞 +91 9876543210</p>

          <p>✉ alumni@ytc.edu.in</p>

        </div>

        <div className="footer-social">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <a href="#">
              <Facebook />
            </a>

            <a href="#">
              <Instagram />
            </a>

            <a href="#">
              <Linkedin />
            </a>

            <a href="#">
              <Github />
            </a>

          </div>

        </div>

      </div>

      <hr />

      <p className="copyright">

        © 2026 Yashoda Technical Campus Alumni Portal.

        <br />

        Developed by MCA Students ❤️

      </p>

    </footer>
  );
}

export default Footer;