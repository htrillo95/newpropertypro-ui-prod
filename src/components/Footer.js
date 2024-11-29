import React from "react";
import "../styles/Footer.css"; // Create a new CSS file or use existing styles

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">
          <h4>YourLogo</h4>
          <p>Your Address Here, Suite Here</p>
          <p>Philadelphia, PA Zip Code Here</p>
          <p>Email: info@yourbusiness.com</p>
          <p>Phone: (555) 555-5555</p>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <h4>Explore</h4>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/properties">Featured Properties</a></li>
            <li><a href="/login">Tenants</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;