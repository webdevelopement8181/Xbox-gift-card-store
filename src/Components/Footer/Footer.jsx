import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Information</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">More Search</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Testimonials</a></li>
            <li><a href="#">Events</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Helpful Links</h3>
          <ul>
            <li><a href="#">Services</a></li>
            <li><a href="#">Supports</a></li>
            <li><a href="#">Terms & Condition</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Our Services</h3>
          <ul>
            <li><a href="#">Brands list</a></li>
            <li><a href="#">Order</a></li>
            <li><a href="#">Return & Exchange</a></li>
            <li><a href="#">Fashion list</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li><i className="fa fa-phone"></i> +91 9999 999 999</li>
            <li><i className="fa fa-envelope"></i> youremailid.com</li>
            <li className="social-icons">
              <a href="#"><i className="fa fa-facebook"></i></a>
              <a href="#"><i className="fa fa-google-plus"></i></a>
              <a href="#"><i className="fa fa-twitter"></i></a>
              <a href="#"><i className="fa fa-instagram"></i></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2018 @ company.Ltd. | All Rights Reserved</p>
        <ul className="footer-links">
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms & Condition</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
