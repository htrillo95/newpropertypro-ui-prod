import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleLogin}>
      <h2>Admin Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
  );
}

export default AdminLogin;