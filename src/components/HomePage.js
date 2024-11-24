import React from 'react';

import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>Welcome to [Your Business Name]</h1>
        <p>
          Providing exceptional property management services for property owners
          and tenants. Let us handle the details so you can enjoy peace of mind.
        </p>
      </header>

      {/* About Us Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          At [Your Business Name], we specialize in managing residential and
          commercial properties with care and professionalism. From handling
          tenant requests to ensuring your properties are well-maintained, we’re
          here to make property ownership simple.
        </p>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="service-item">
          <h3>Property Listings</h3>
          <p>
            Browse our available properties for rent. Each listing is updated
            regularly to reflect current availability.
          </p>
        </div>
        <div className="service-item">
          <h3>Tenant Portal</h3>
          <p>
            Current tenants can submit maintenance requests, view lease
            information, and contact us directly through the website.
          </p>
        </div>
        <div className="service-item">
          <h3>Owner Support</h3>
          <p>
            Property owners can rely on us to handle tenant relations, rent
            collection, and property maintenance efficiently.
          </p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>Get in Touch</h2>
        <p>Ready to learn more about our services? Contact us today!</p>
        <button className="cta-button">Contact Us</button>
      </section>
    </div>
  );
}

export default HomePage;