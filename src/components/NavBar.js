import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ role, handleLogout }) {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
      <Link to="/properties" style={{ marginRight: '10px' }}>Properties</Link>

      {/* Show links based on the user's role */}
      {role === '' && (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Tenant Login</Link>
          <Link to="/admin-login" style={{ marginRight: '10px' }}>Admin Login</Link>
        </>
      )}
      {role === 'tenant' && (
        <Link to="/dashboard" style={{ marginRight: '10px' }}>Tenant Dashboard</Link>
      )}
      {role === 'admin' && (
        <Link to="/admin" style={{ marginRight: '10px' }}>Admin Panel</Link>
      )}

      {/* Show logout button if logged in */}
      {role !== '' && (
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
      )}
    </nav>
  );
}

export default NavBar;