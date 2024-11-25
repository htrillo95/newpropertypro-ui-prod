import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/RegisterForm.css"; // Reuse the register form CSS

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Hard-coded admin credentials
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'password123';

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Verify credentials against hard-coded values
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('role', 'admin'); // Store admin role in session storage
      onLogin(); // Update admin login state
      navigate('/admin'); // Redirect to admin panel
    } else {
      setError('Invalid admin login credentials');
    }
  };

  return (
    <div className="register-container"> {/* Reuse the container class */}
      <h2>Admin Login</h2>
      <p className="form-instructions">
        Log in with your administrator account to manage properties, tenant requests, and more.
      </p>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;