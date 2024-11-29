import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import "../styles/HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Your Trusted Property Management Partner</h1>
          <p>
            Expertly managing residential and commercial properties with care
            and precision.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          At [Your Business Name], we specialize in property management
          solutions that simplify ownership and enhance tenant satisfaction.
          From handling maintenance to lease management, we’re here to help.
        </p>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Residential Management</h3>
            <p>
              Comprehensive services for single-family homes, condos, and more.
            </p>
          </div>
          <div className="service-card">
            <h3>Commercial Management</h3>
            <p>
              Expert management for retail spaces, office buildings, and
              warehouses.
            </p>
          </div>
          <div className="service-card">
            <h3>Tenant Services</h3>
            <p>
              Seamless tenant support with a dedicated portal for maintenance
              and communication.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          {/* Left Section: Logo and Contact */}
          <div className="footer-left">
            <h4>YourLogo</h4>
            <p>Your Address Here, Suite Here</p>
            <p>Philadelphia, PA Zip Code Here</p>
            <p>Email: info@yourbusiness.com</p>
            <p>Phone: (555) 555-5555</p>
          </div>

          {/* Right Section: Navigation Links */}
          <div className="footer-right">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/about">About</Link></li> {/* Updated to Link */}
              <li><Link to="/properties">Featured Properties</Link></li>
              <li><Link to="/login">Tenants</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;