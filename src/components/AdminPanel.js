import React, { useState, useEffect } from 'react';

function AdminPanel() {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);

  // Fetch all maintenance requests from the backend
  useEffect(() => {
    fetch('http://localhost:8080/api/maintenance-request') // Singular
      .then((response) => response.json())
      .then((data) => setMaintenanceRequests(data))
      .catch((error) => console.error('Error fetching maintenance requests:', error));
  }, []);

  // Handle status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/maintenance-request/${id}/status?status=${newStatus}`, {
        method: 'PUT',
      });

      if (response.ok) {
        setMaintenanceRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.id === id ? { ...req, status: newStatus } : req
          )
        );
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Handle delete request with confirmation
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this maintenance request? This action cannot be undone.'
    );

    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8080/api/maintenance-request/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMaintenanceRequests((prevRequests) =>
            prevRequests.filter((req) => req.id !== id)
          );
        } else {
          console.error('Failed to delete request');
        }
      } catch (error) {
        console.error('Error deleting request:', error);
      }
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <h3>View Maintenance Requests</h3>
      <ul>
        {maintenanceRequests.map((request) => (
          <li key={request.id}>
            <p><strong>Issue:</strong> {request.description}</p>
            <p><strong>Status:</strong> {request.status}</p>

            {/* Dropdown for status update */}
            <select
              value={request.status}
              onChange={(e) => handleStatusChange(request.id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            {/* Delete button with confirmation */}
            <button onClick={() => handleDelete(request.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;