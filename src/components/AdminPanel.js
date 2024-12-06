import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import '../styles/AdminPanel.css';

function AdminPanel() {
  const [properties, setProperties] = useState([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    rentAmount: '',
    propertyLink: '',
    imageUrl: '',
  });
  const [editingProperty, setEditingProperty] = useState(null);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState([]);

  useEffect(() => {
    fetchProperties();
    fetchMaintenanceRequests();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/properties');
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        toast.error('Failed to fetch properties.');
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      toast.error('An error occurred while fetching properties.');
    }
  };

  const fetchMaintenanceRequests = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/maintenance-request');
      if (response.ok) {
        const data = await response.json();
        setMaintenanceRequests(data);
      } else {
        toast.error('Failed to fetch maintenance requests.');
      }
    } catch (err) {
      console.error('Error fetching maintenance requests:', err);
      toast.error('An error occurred while fetching maintenance requests.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newProperty = await response.json();
        setProperties([...properties, newProperty]);
        setFormData({ name: '', address: '', rentAmount: '', propertyLink: '', imageUrl: '' });
        toast.success('Property added successfully!');
      } else {
        toast.error('Failed to add property.');
      }
    } catch (err) {
      console.error('Error adding property:', err);
      toast.error('An error occurred while adding the property.');
    }
  };

  const handleEditClick = (property) => {
    setEditingProperty(property);
    setFormData({ ...property });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/properties/${editingProperty.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedProperty = await response.json();
        setProperties((prevProperties) =>
          prevProperties.map((property) =>
            property.id === updatedProperty.id ? updatedProperty : property
          )
        );
        setEditingProperty(null);
        setFormData({ name: '', address: '', rentAmount: '', propertyLink: '', imageUrl: '' });
        toast.success('Property updated successfully!');
      } else {
        toast.error('Failed to update property.');
      }
    } catch (err) {
      console.error('Error updating property:', err);
      toast.error('An error occurred while updating the property.');
    }
  };

  const handleDeleteProperty = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this property?');
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8080/api/properties/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setProperties(properties.filter((property) => property.id !== id));
          toast.success('Property deleted successfully.');
        } else {
          toast.error('Failed to delete property.');
        }
      } catch (err) {
        console.error('Error deleting property:', err);
        toast.error('An error occurred while deleting the property.');
      }
    }
  };

  const handleDeleteRequest = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this maintenance request?');
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8080/api/maintenance-request/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setMaintenanceRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
          toast.success('Maintenance request deleted successfully.');
        } else {
          toast.error('Failed to delete maintenance request.');
        }
      } catch (err) {
        console.error('Error deleting maintenance request:', err);
        toast.error('An error occurred while deleting the maintenance request.');
      }
    }
  };

  const handleBulkDeleteProperties = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete the selected properties?');
    if (isConfirmed) {
      try {
        for (const id of selectedProperties) {
          await fetch(`http://localhost:8080/api/properties/${id}`, { method: 'DELETE' });
        }
        setProperties(properties.filter((property) => !selectedProperties.includes(property.id)));
        setSelectedProperties([]);
        toast.success('Selected properties deleted successfully.');
      } catch (err) {
        console.error('Error deleting properties:', err);
        toast.error('An error occurred while deleting the properties.');
      }
    }
  };

  const handleBulkDeleteRequests = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete the selected maintenance requests?');
    if (isConfirmed) {
      try {
        for (const id of selectedRequests) {
          await fetch(`http://localhost:8080/api/maintenance-request/${id}`, { method: 'DELETE' });
        }
        setMaintenanceRequests(maintenanceRequests.filter((req) => !selectedRequests.includes(req.id)));
        setSelectedRequests([]);
        toast.success('Selected maintenance requests deleted successfully.');
      } catch (err) {
        console.error('Error deleting maintenance requests:', err);
        toast.error('An error occurred while deleting the maintenance requests.');
      }
    }
  };

  const handlePropertySelection = (id) => {
    setSelectedProperties((prev) =>
      prev.includes(id) ? prev.filter((propId) => propId !== id) : [...prev, id]
    );
  };

  const handleRequestSelection = (id) => {
    setSelectedRequests((prev) =>
      prev.includes(id) ? prev.filter((reqId) => reqId !== id) : [...prev, id]
    );
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/maintenance-request/${id}/status?status=${newStatus}`, {
        method: 'PUT',
      });

      if (response.ok) {
        setMaintenanceRequests((prevRequests) =>
          prevRequests.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
        );
        toast.success('Maintenance request status updated.');
      } else {
        toast.error('Failed to update maintenance request status.');
      }
    } catch (err) {
      console.error('Error updating maintenance request status:', err);
      toast.error('An error occurred while updating the status.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      {/* Add Property Section */}
      <section className="add-property">
        <h3>Add Property</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Property Name"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            required
          />
          <input
            type="number"
            name="rentAmount"
            value={formData.rentAmount}
            onChange={handleInputChange}
            placeholder="Rent Amount"
            required
          />
          <input
            type="url"
            name="propertyLink"
            value={formData.propertyLink}
            onChange={handleInputChange}
            placeholder="Property Link"
          />
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="Image URL"
          />
          <button type="submit">Add Property</button>
        </form>
      </section>

    {/* Existing Properties */}
<section className="property-list">
  <h3>Existing Properties</h3>
  <button className="delete-selected-button" onClick={handleBulkDeleteProperties}>
    Delete Selected Properties
  </button>
  {properties.length > 0 ? (
    <ul>
      {properties.map((property) => (
        <li key={property.id}>
          <div>
            <input
              type="checkbox"
              checked={selectedProperties.includes(property.id)}
              onChange={() => handlePropertySelection(property.id)}
            />
            <p><strong>{property.name}</strong></p>
            <p>{property.address}</p>
            <p>Rent: ${property.rentAmount}</p>
          </div>
          <img src={property.imageUrl} alt={property.name} />
          <div className="buttons">
            <a href={property.propertyLink} target="_blank" rel="noopener noreferrer" className="view-listing">
              View Listing
            </a>
            <button onClick={() => handleEditClick(property)}>Edit</button>
            <button onClick={() => handleDeleteProperty(property.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p>No properties found.</p>
  )}
</section>

{/* Maintenance Requests */}
<section className="maintenance-requests">
  <h3>Maintenance Requests</h3>
  <button className="delete-selected-button" onClick={handleBulkDeleteRequests}>
    Delete Selected Maintenance Requests
  </button>
  {maintenanceRequests.length > 0 ? (
    <ul>
      {maintenanceRequests.map((request) => (
        <li key={request.id}>
          <div>
            <input
              type="checkbox"
              checked={selectedRequests.includes(request.id)}
              onChange={() => handleRequestSelection(request.id)}
            />
            <p><strong>Description:</strong> {request.description}</p>
            <p><strong>Submitted By:</strong> {request.submittedBy || 'Unknown'}</p>
            <p>
              <strong>Status:</strong>
              <span className={`status ${request.status.toLowerCase().replace(' ', '-')}`}>{request.status}</span>
            </p>
          </div>
          <select
            value={request.status}
            onChange={(e) => handleStatusChange(request.id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <button onClick={() => handleDeleteRequest(request.id)}>Delete</button>
        </li>
      ))}
    </ul>
  ) : (
    <p>No maintenance requests found.</p>
  )}
</section>
        </div>
      );
    }
    
    export default AdminPanel;