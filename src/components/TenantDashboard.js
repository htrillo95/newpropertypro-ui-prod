import React, { useState } from 'react';

function TenantDashboard() {
  const [issueDescription, setIssueDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleMaintenanceRequestSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any previous messages

    try {
      const response = await fetch('http://localhost:8080/api/maintenance-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: issueDescription }),
      });

      if (response.ok) {
        setMessage('Maintenance request submitted successfully!');
        setIssueDescription(''); // Clear the form
      } else {
        setMessage('Failed to submit maintenance request.');
      }
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
      setMessage('An error occurred. Please try again.');
    }
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

      {message && <p>{message}</p>}
    </div>
  );
}

export default TenantDashboard;