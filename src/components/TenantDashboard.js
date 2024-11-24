import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import '../styles/TenantDashboard.css';

function TenantDashboard() {
  const [issueDescription, setIssueDescription] = useState('');
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const tenantId = sessionStorage.getItem('tenantId');
      if (!tenantId) {
        toast.error('You must log in to view your maintenance requests.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/maintenance-request/by-tenant?tenantId=${tenantId}`);
        if (response.ok) {
          const data = await response.json();
          setMaintenanceRequests(data);
        } else {
          toast.error('Failed to fetch maintenance requests.');
        }
      } catch (error) {
        console.error('Error fetching maintenance requests:', error);
        toast.error('An error occurred while fetching requests.');
      }
    };

    fetchRequests();
  }, []);

  const handleMaintenanceRequestSubmit = async (e) => {
    e.preventDefault();

    if (!issueDescription.trim()) {
      toast.error('Description cannot be empty.');
      return;
    }

    if (issueDescription.length > 300) {
      toast.error('Description cannot exceed 300 characters.');
      return;
    }

    const tenantId = sessionStorage.getItem('tenantId');
    if (!tenantId) {
      toast.error('You must log in to submit a request.');
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
        setMaintenanceRequests([...maintenanceRequests, newRequest]);
        setIssueDescription('');
        toast.success('Maintenance request submitted successfully!');
      } else {
        toast.error('Failed to submit maintenance request.');
      }
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
      toast.error('An error occurred while submitting your request.');
    }
  };

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      <h3>Submit Maintenance Request</h3>
      <form onSubmit={handleMaintenanceRequestSubmit}>
        <textarea
          value={issueDescription}
          onChange={(e) => setIssueDescription(e.target.value)}
          placeholder="Describe the issue (max 300 characters)"
          maxLength="300"
          required
        />
        <button type="submit">Submit Request</button>
      </form>

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