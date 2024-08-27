import './Footer.css'; 
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          {/* <img src="/path-to-your-logo.png" alt="Footer Logo" /> */}
          <p>Copyright © 2023 All rights reserved</p>
          <div className="footer-social">
            <a href="https://www.facebook.com"><FaFacebookF /></a>
            <a href="https://www.twitter.com"><FaTwitter /></a>
            <a href="https://www.instagram.com"><FaInstagram /></a>
            <a href="https://www.linkedin.com"><FaLinkedinIn /></a>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>About</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#careers">Careers</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="#help">Help</a></li>
              <li><a href="#terms">Terms</a></li>
              <li><a href="#privacy">Privacy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
