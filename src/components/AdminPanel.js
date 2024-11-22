import React, { useState, useEffect } from 'react';

function AdminPanel() {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]); // Ensure it's initialized as an array
  const [error, setError] = useState(''); // For error handling

  // Fetch all maintenance requests from the backend
  useEffect(() => {
    const fetchMaintenanceRequests = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/maintenance-request'); // Ensure endpoint is correct

        if (response.ok) {
          const data = await response.json();

          // Validate the response data is an array
          if (Array.isArray(data)) {
            setMaintenanceRequests(data);
          } else {
            throw new Error('Fetched data is not an array');
          }
        } else {
          throw new Error('Failed to fetch maintenance requests');
        }
      } catch (err) {
        console.error('Error fetching maintenance requests:', err);
        setError('An error occurred while fetching maintenance requests. Please try again later.');
      }
    };

    fetchMaintenanceRequests();
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
        setError('Failed to update the request status. Please try again.');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setError('An error occurred while updating the request status.');
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
          setError('Failed to delete the request. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting request:', error);
        setError('An error occurred while deleting the request.');
      }
    }
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/admin-login'; // Redirect to admin login after logout
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>View Maintenance Requests</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {maintenanceRequests.length > 0 ? (
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
      ) : (
        <p>No maintenance requests found.</p>
      )}
    </div>
  );
}

export default AdminPanel;