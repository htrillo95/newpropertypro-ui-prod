import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ role, handleLogout }) {
  return (
    <nav style={{ 
      padding: '10px 20px', 
      borderBottom: '1px solid #ddd', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between' 
    }}>
      {/* Logo on the left */}
      <div>
        <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.5rem', color: '#FF6600' }}>
          YourLogo
        </Link>
      </div>

      {/* Navigation links aligned to the right */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>Home</Link>
        <Link to="/properties" style={{ textDecoration: 'none', color: '#000' }}>Properties</Link>

        {role === '' && (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: '#000' }}>Tenant Login</Link>
            <Link to="/admin-login" style={{ textDecoration: 'none', color: '#000' }}>Admin Login</Link>
          </>
        )}
        {role === 'tenant' && (
          <Link to="/dashboard" style={{ textDecoration: 'none', color: '#000' }}>Tenant Dashboard</Link>
        )}
        {role === 'admin' && (
          <Link to="/admin" style={{ textDecoration: 'none', color: '#000' }}>Admin Panel</Link>
        )}

        {role !== '' && (
          <button 
            onClick={handleLogout} 
            style={{ padding: '5px 10px', border: 'none', backgroundColor: '#FF6600', color: '#fff', borderRadius: '5px', cursor: 'pointer' }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;