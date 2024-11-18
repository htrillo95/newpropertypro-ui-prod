import React, { useState } from 'react';

function TenantDashboard() {
  const [issueDescription, setIssueDescription] = useState('');

  const handleMaintenanceRequestSubmit = (e) => {
    e.preventDefault();
    alert(`Maintenance request submitted: ${issueDescription}`);
    setIssueDescription(''); // Clear the form after submission
  };

  const handleViewLeaseInfo = () => {
    alert('Lease information will be available soon!');
  };

  const handleContactManagement = () => {
    alert('Contact property management at: (123) 456-7890 or email: info@propertypro.com');
  };

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      <div className="dashboard-buttons">
        <button onClick={handleViewLeaseInfo}>View Lease Information</button>
        <button onClick={handleContactManagement}>Contact Management</button>
      </div>

      <h3>Submit Maintenance Request</h3>
      <form onSubmit={handleMaintenanceRequestSubmit}>
        <textarea
          value={issueDescription}
          onChange={(e) => setIssueDescription(e.target.value)}
          placeholder="Describe the issue"
          required
        />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default TenantDashboard;