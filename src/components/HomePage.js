import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import "../styles/HomePage.css";
import logoIcon from '../assets/images/LogoCopy.png';

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
          At Trillo Real Estate, we bring exceptional market expertise, deep local area knowledge, and unmatched attention to detail to every client interaction. 
          With a focus on seamless property management, we simplify ownership and enhance tenant satisfaction. From maintenance to lease management, we’re here to help.
        </p>
      </section>

      {/* Our Services Section */}
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <i className="fas fa-home service-icon"></i>
            <h3>Residential Management</h3>
            <p>
              Comprehensive services for single-family homes, condos, and more.
            </p>
          </div>
          <div className="service-card">
            <i className="fas fa-building service-icon"></i>
            <h3>Commercial Management</h3>
            <p>
              Expert management for retail spaces, office buildings, and warehouses.
            </p>
          </div>
          <div className="service-card">
            <i className="fas fa-users service-icon"></i>
            <h3>Tenant Services</h3>
            <p>
              Seamless tenant support with a dedicated portal for maintenance and communication.
            </p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-container">
            {/* Longer Testimonial */}
            <div className="featured-review">
            <p>
                "I am beyond grateful to have worked with Lisa Trillo as my leasing agent.
                Honestly, Lisa is the best and most patient agent I have ever encountered.
                I have never met anyone who goes above and beyond for their clients the way she does.
                Lisa not only provided expert advice, but she also made sure that my roommate and I found 
                exactly what we needed in an apartment. Whether it was cost, the neighborhood, whether the place was 
                a good fit or not, she was very open and gently honest. Her commitment to following through 
                and consistently checking in made the entire process seamless and stress-free. Beyond her 
                professionalism, Lisa is incredibly relatable and always offers additional resources when needed. 
                Her genuine care for her clients shines through in every interaction. I wholeheartedly recommend Lisa 
                Trillo to anyone in need of a dedicated, thoughtful, and truly exceptional leasing agent. She is a rare find!"
            </p>
            <p className="testimonial-author">– Christian P.</p>
            </div>

            {/* Two Shorter Testimonials */}
            <div className="short-reviews">
            <div className="review-card">
                <p>
                "Lisa is amazing! She works really hard to meet your needs and doesn't settle."
                </p>
                <p className="testimonial-author">– Maggie O.</p>
            </div>
            <div className="review-card">
                <p>
                "Quick and easy process! Lisa answered all my inquiries promptly and helped us secure an apartment in two days."
                </p>
                <p className="testimonial-author">– Matthew S.</p>
            </div>
            </div>
        </div>
        </section>

      {/* Footer Section */}
      <footer className="footer">
                <div className="footer-container">
                    {/* Left Section: Logo and Contact */}
                    <div className="footer-left">
                        <img
                            src={logoIcon}
                            alt="Trillo RE Icon"
                            className="footer-logo"
                        />
                        <p>P.O Box 3612</p>
                        <p>Philadelphia, PA 19125</p>
                        <p>Email: TrilloMGMT@gmail.com</p>
                        <p>Phone: (215) 989-5411</p>
                      </div>

                    {/* Right Section: Navigation Links */}
                    <div className="footer-right">
                        <p></p>
                        <h4>Explore</h4>
                        <p></p>
                        <ul>
                            <li><Link to="/about">About</Link></li>
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