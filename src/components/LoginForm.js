import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/RegisterForm.css";
import logoIcon from '../assets/images/LogoCopy.png';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid login credentials');
      }

      const data = await response.json();
      sessionStorage.setItem('tenantId', data.id); // Store tenant ID
      sessionStorage.setItem('role', 'tenant'); // Store role
      onLogin(); // Update tenant login state in App.js
      navigate('/dashboard'); // Redirect to tenant dashboard
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="register-container">
        <h2>Tenant Login</h2>
        <p className="form-instructions">
          Log in to access your tenant dashboard, submit maintenance requests, and view lease details.
        </p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <div style={{ height: "160px" }}></div>
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
            <p></p> {/* Blank spacer */}
            <h4>Explore</h4>
            <p></p> {/* Blank spacer */}
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/properties">Featured Properties</a></li>
              <li><a href="/login">Tenants</a></li>
              <li><a href="/register">Register</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LoginForm;