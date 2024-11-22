import React, { useState, useEffect } from 'react';

function TenantDashboard() {
  const [issueDescription, setIssueDescription] = useState('');
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      const tenantId = sessionStorage.getItem('tenantId');

      if (!tenantId) {
        setMessage('You must log in to view your maintenance requests.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/maintenance-request/by-tenant?tenantId=${tenantId}`);
        if (response.ok) {
          const data = await response.json();
          setMaintenanceRequests(data);
        } else {
          setMessage('Failed to fetch maintenance requests.');
        }
      } catch (error) {
        console.error('Error fetching maintenance requests:', error);
        setMessage('An error occurred. Please try again.');
      }
    };

    fetchRequests();
  }, []);

  const handleMaintenanceRequestSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const tenantId = sessionStorage.getItem('tenantId');
    if (!tenantId) {
      setMessage('You must log in to submit a request.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/maintenance-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: issueDescription, tenantId }),
      });

      if (response.ok) {
        const newRequest = await response.json();
        setMessage('Maintenance request submitted successfully!');
        setIssueDescription('');
        setMaintenanceRequests([...maintenanceRequests, newRequest]);
      } else {
        setMessage('Failed to submit maintenance request.');
      }
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

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

      <h3>Your Maintenance Requests</h3>
      {maintenanceRequests.length > 0 ? (
        <ul>
          {maintenanceRequests.map((request) => (
            <li key={request.id}>
              <strong>{request.description}</strong> - Status: {request.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No maintenance requests found.</p>
      )}
    </div>
  );
}

export default TenantDashboard;