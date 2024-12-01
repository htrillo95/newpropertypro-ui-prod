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
                    <h1 className="display-4">About PropertyPro</h1>
                    <p className="lead">
                        At PropertyPro, we’re committed to simplifying property management and
                        building stronger relationships between landlords and tenants. Learn more about our
                        mission, vision, and the people who make it happen.
                    </p>
                </div>
            </section>

            {/* About Owner Section - Two Column Layout */}
            <section className="owner-section py-5">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Profile Picture */}
                        <div className="col-md-4 text-center">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Owner"
                                className="rounded-circle shadow"
                            />
                        </div>
                        {/* Profile Details */}
                        <div className="col-md-8">
                            <h3 className="mt-3">Maria Gomez</h3>
                            <p>
                                Founder & CEO of PropertyPro. With over a decade of experience in real estate,
                                Maria is passionate about providing exceptional property management services for
                                landlords and tenants alike.
                            </p>
                            <p>
                                Maria believes in creating a seamless experience for property owners and tenants.
                                Her mission is to empower landlords with tools that enhance property value while
                                ensuring tenant satisfaction.
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
                        To revolutionize property management with cutting-edge technology and exceptional
                        service, fostering trust and satisfaction between landlords and tenants.
                    </p>
                    <p>
                        By integrating modern technology with personalized service, PropertyPro aims to set
                        a new standard in property management excellence.
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
                        <p>Your Address Here, Suite Here</p>
                        <p>Philadelphia, PA Zip Code Here</p>
                        <p>Email: info@yourbusiness.com</p>
                        <p>Phone: (555) 555-5555</p>
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