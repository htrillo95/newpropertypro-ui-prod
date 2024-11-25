import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/RegisterForm.css"; // Reuse the register form CSS

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
    <div className="register-container"> {/* Reuse the container class */}
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
  );
}

export default LoginForm;