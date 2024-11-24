import React, { useState, useEffect } from 'react';

function AdminPanel() {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    rentAmount: '',
    propertyLink: '',
    imageUrl: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/properties');
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        setError('Failed to fetch properties.');
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('An error occurred. Please try again later.');
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
        setMessage('Property added successfully!');
      } else {
        setMessage('Failed to add property.');
      }
    } catch (err) {
      console.error('Error adding property:', err);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this property? This action cannot be undone.');
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8080/api/properties/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setProperties(properties.filter((property) => property.id !== id));
          setMessage('Property deleted successfully.');
        } else {
          setMessage('Failed to delete property.');
        }
      } catch (err) {
        console.error('Error deleting property:', err);
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Admin Panel</h2>
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

      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Existing Properties</h3>
      {properties.length > 0 ? (
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              <p><strong>{property.name}</strong></p>
              <p>{property.address}</p>
              <p>Rent: ${property.rentAmount}</p>
              <img src={property.imageUrl} alt={property.name} style={{ width: '100px' }} />
              <a href={property.propertyLink} target="_blank" rel="noopener noreferrer">View Listing</a>
              <button onClick={() => handleDelete(property.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
}

export default AdminPanel;