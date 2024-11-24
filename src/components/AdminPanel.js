import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function AdminPanel() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]); // For filtered list
  const [searchTerm, setSearchTerm] = useState(''); // Search input
  const [rentRange, setRentRange] = useState({ min: 0, max: 10000 }); // Rent range filter
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    rentAmount: '',
    propertyLink: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/properties');
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data); // Initialize filtered list
      } else {
        toast.error('Failed to fetch properties.');
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      toast.error('An error occurred while fetching properties. Please try again.');
    }
  };

  const applyFilters = (search, range) => {
    const filtered = properties.filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(search.toLowerCase()) ||
        property.address.toLowerCase().includes(search.toLowerCase());
      const matchesRent =
        property.rentAmount >= range.min && property.rentAmount <= range.max;
      return matchesSearch && matchesRent;
    });
    setFilteredProperties(filtered);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    applyFilters(term, rentRange);
  };

  const handleRentChange = (e) => {
    const { name, value } = e.target;
    const newRange = { ...rentRange, [name]: Number(value) };
    setRentRange(newRange);
    applyFilters(searchTerm, newRange);
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
        setFilteredProperties([...filteredProperties, newProperty]); // Update filtered list
        setFormData({ name: '', address: '', rentAmount: '', propertyLink: '', imageUrl: '' });
        toast.success('Property added successfully!');
      } else {
        toast.error('Failed to add property.');
      }
    } catch (err) {
      console.error('Error adding property:', err);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this property? This action cannot be undone.');
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8080/api/properties/${id}`, { method: 'DELETE' });
        if (response.ok) {
          const updatedProperties = properties.filter((property) => property.id !== id);
          setProperties(updatedProperties);
          setFilteredProperties(updatedProperties); // Update filtered list
          toast.success('Property deleted successfully.');
        } else {
          toast.error('Failed to delete property.');
        }
      } catch (err) {
        console.error('Error deleting property:', err);
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setRentRange({ min: 0, max: 10000 });
    setFilteredProperties(properties); // Reset to all properties
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      {/* Filters */}
      <div>
        <h3>Filters</h3>
        <input
          type="text"
          placeholder="Search by property name or address"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div>
          <label>
            Min Rent:
            <input
              type="number"
              name="min"
              value={rentRange.min}
              onChange={handleRentChange}
              style={{ width: '80px', marginLeft: '10px' }}
            />
          </label>
          <label style={{ marginLeft: '20px' }}>
            Max Rent:
            <input
              type="number"
              name="max"
              value={rentRange.max}
              onChange={handleRentChange}
              style={{ width: '80px', marginLeft: '10px' }}
            />
          </label>
        </div>
        <button onClick={handleResetFilters} style={{ marginTop: '10px' }}>Reset Filters</button>
      </div>

      {/* Add Property */}
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

      {/* Existing Properties */}
      <h3>Existing Properties</h3>
      {filteredProperties.length > 0 ? (
        <ul>
          {filteredProperties.map((property) => (
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