import React, { useState } from 'react';
import "../styles/RegisterForm.css";
import logoIcon from '../assets/images/LogoCopy.png'; // Import the logo

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      // If registration is successful
      alert('Registration successful! Please log in.'); // Show a success message
      window.location.href = '/login'; // Redirect to the login page
    } catch (error) {
      setError(error.message); // Display any errors
    }
  };

  return (
    <>
      <div className="register-container">
        <h2>Register</h2>
        <p className="form-instructions">
          Create an account to access your tenant dashboard and manage your property requests.
        </p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
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
          <button type="submit">Register</button>
        </form>
      </div>

      {/* Blank Spacer */}
      <div style={{ height: "200px" }}></div>

      {/* Hardcoded Footer */}
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

export default RegisterForm;