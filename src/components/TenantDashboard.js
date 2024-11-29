import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import '../styles/TenantDashboard.css';

function TenantDashboard() {
  const [issueDescription, setIssueDescription] = useState('');
  const [tenantName, setTenantName] = useState(''); // New field for tenant name
  const [leasingInfo, setLeasingInfo] = useState(''); // New field for leasing info
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

    if (!issueDescription.trim() || !tenantName.trim() || !leasingInfo.trim()) {
      toast.error('All fields are required.');
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
        body: JSON.stringify({
          description: issueDescription,
          tenantId,
          submittedBy: tenantName,
          leasingInfo,
        }),
      });

      if (response.ok) {
        const newRequest = await response.json();
        setMaintenanceRequests([...maintenanceRequests, newRequest]);
        setIssueDescription('');
        setTenantName('');
        setLeasingInfo('');
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
    <div className="tenant-dashboard">
      <header className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
      </header>

      <section className="submit-form-section">
        <h2>Submit Maintenance Request</h2>
        <form onSubmit={handleMaintenanceRequestSubmit}>
          <input
            type="text"
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
            placeholder="Your Name"
            maxLength="50"
            required
            className="input-field"
          />
          <input
            type="text"
            value={leasingInfo}
            onChange={(e) => setLeasingInfo(e.target.value)}
            placeholder="Leasing Info (e.g., Apartment 101)"
            maxLength="100"
            required
            className="input-field"
          />
          <textarea
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            placeholder="Describe the issue (max 300 characters)"
            maxLength="300"
            required
          />
          <button type="submit" className="submit-button">
            Submit Request
          </button>
        </form>
      </section>

      <section className="requests-section">
        <h2>Your Maintenance Requests</h2>
        {maintenanceRequests.length > 0 ? (
          <div className="requests-list">
            {maintenanceRequests.map((request) => (
              <div key={request.id} className="request-card">
                <p className="request-description">
                  <strong>{request.description}</strong>
                </p>
                <p className="request-status">
                  <span className="label">Status:</span>{' '}
                  <span className={`value ${request.status.toLowerCase().replace(' ', '-')}`}>
                    {request.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No maintenance requests found.</p>
        )}
      </section>
    </div>
  );
}

export default TenantDashboard;