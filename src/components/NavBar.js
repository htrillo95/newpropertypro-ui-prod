import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ isTenantLoggedIn, isAdminLoggedIn, handleLogout }) {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
      <Link to="/properties" style={{ marginRight: '10px' }}>Properties</Link>
      {!isTenantLoggedIn && !isAdminLoggedIn && (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Tenant Login</Link>
          <Link to="/admin-login" style={{ marginRight: '10px' }}>Admin Login</Link>
        </>
      )}
      {isTenantLoggedIn && (
        <Link to="/dashboard" style={{ marginRight: '10px' }}>Tenant Dashboard</Link>
      )}
      {isAdminLoggedIn && (
        <Link to="/admin" style={{ marginRight: '10px' }}>Admin Panel</Link>
      )}
      {(isTenantLoggedIn || isAdminLoggedIn) && (
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
      )}
    </nav>
  );
}

export default NavBar;