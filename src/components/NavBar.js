import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import logo from '../assets/images/LogoNew.png';

function NavBar({ role, handleLogout }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <nav className="navbar">
            {/* Logo */}
            <Link to="/" className="logo">
                <img src={logo} alt="Trillo RE Logo" className="logo-image" />
            </Link>

            {/* Navigation Links */}
            <div className={`nav-links ${menuOpen ? 'mobile active' : ''}`}>
                <Link to="/">Home</Link>
                <Link to="/properties">Properties</Link>
                {role === '' && (
                    <>
                        <Link to="/login">Tenant</Link>
                        <Link to="/admin-login">Admin</Link>
                    </>
                )}
                {role === 'tenant' && <Link to="/dashboard">Dashboard</Link>}
                {role === 'admin' && <Link to="/admin">Admin Panel</Link>}
                {role !== '' && (
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                )}
            </div>

            {/* Hamburger Menu */}
            <div className="hamburger" onClick={toggleMenu}>
                <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
            </div>
        </nav>
    );
}

export default NavBar;