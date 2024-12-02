import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AboutPage.css';
import logoIcon from '../assets/images/LogoCopy.png';

function AboutPage() {
    return (
        <div className="about-page">
            {/* About Page Hero Section */}
            <section className="about-hero-section text-center py-5 bg-light">
                <div className="container">
                    <h1 className="display-4">More About Us</h1>
                    <p className="lead">
                        At Trillo RE, we go beyond property management. Our commitment lies in fostering strong relationships, 
                        enhancing property value, and providing unparalleled tenant satisfaction. Explore our story and see how we’re reshaping the property management experience.
                    </p>
                </div>
            </section>

            {/* About Owner Section - Two Column Layout */}
            <section className="owner-section py-5">
                <div className="container text-center">
                    <div className="row align-items-center">
                        {/* Profile Picture */}
                        <div className="col-md-12">
                            <img
                                src={require('../assets/images/Lisa.jpg')}
                                alt="Owner"
                                className="rounded-circle shadow"
                            />
                        </div>
                        {/* Profile Details */}
                        <div className="col-md-12 mt-3">
                            <h3>Lisa Trillo</h3>
                            <p>
                                Founder, brings over a decade of expertise in real estate to the table.
                                Her dedication to client care and attention to detail has earned her a reputation for excellence, as reflected
                                in glowing testimonials from satisfied clients.
                            </p>
                            <p>
                                From seamless lease management to proactive maintenance, Maria has always believed that exceptional service
                                starts with understanding the unique needs of landlords and tenants. Her vision is simple: 
                                create stress-free, efficient property management solutions that elevate the experience for everyone involved.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission and Vision Section */}
            <section className="mission-vision-section py-5 bg-light">
                <div className="container text-center">
                    <h2>Our Mission & Vision</h2>
                    <p>
                        To provide landlords and tenants with peace of mind through innovative solutions and exceptional service. 
                        We believe in a future where property management is effortless, transparent, and trusted by all.
                    </p>
                    <p>
                        Our vision is to empower property owners to maximize the value of their investments while creating a positive and supportive experience for tenants. 
                        By blending cutting-edge technology with a personalized approach, we’re setting a new standard for excellence in the industry.
                    </p>
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

export default AboutPage;