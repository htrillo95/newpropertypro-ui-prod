import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

function NavBar({ role, handleLogout }) {
    return (
        <nav className="navbar">
            {/* Left Section: Logo */}
            <Link to="/" className="logo">
                YourLogo
            </Link>

            {/* Right Section: Navigation Links */}
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/properties">Properties</Link>

                {role === '' && (
                    <>
                        <Link to="/login" className="login-btn">Tenant</Link>
                        <Link to="/admin-login" className="login-btn">Admin</Link>
                    </>
                )}
                {role === 'tenant' && (
                    <Link to="/dashboard">Dashboard</Link>
                )}
                {role === 'admin' && (
                    <Link to="/admin">Admin Panel</Link>
                )}
            </div>

            {/* Logout Button */}
            {role !== '' && (
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            )}
        </nav>
    );
}

export default NavBar;