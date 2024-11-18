import React, { useState } from 'react';
import ManageProperties from './ManageProperties';

function AdminPanel() {
  const [view, setView] = useState('dashboard');

  return (
    <div>
      <h2>Admin Panel</h2>
      <button onClick={() => setView('properties')}>Manage Properties</button>
      <button onClick={() => setView('requests')}>View Tenant Requests</button>
      {/* Account Settings button can be removed or kept as a placeholder */}
      
      {view === 'properties' && <ManageProperties />}
      {/* Add TenantRequests component when you're ready to implement it */}
    </div>
  );
}

export default AdminPanel;