import React, { useState, useEffect } from 'react';

function ManageProperties() {
  const [properties, setProperties] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentProperty, setCurrentProperty] = useState({
    id: '',
    name: '',
    address: '',
    rentAmount: '',
    propertyLink: ''
  });
  const [newProperty, setNewProperty] = useState({
    name: '',
    address: '',
    rentAmount: '',
    propertyLink: ''
  });

  // Fetch properties from your API
  useEffect(() => {
    fetch('http://localhost:8080/api/properties')
      .then((response) => response.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error('Error fetching properties:', error));
  }, []);

  // Handle adding a new property
  const handleAddProperty = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProperty),
      });

      if (response.ok) {
        const addedProperty = await response.json();
        setProperties((prev) => [...prev, addedProperty]);
        setNewProperty({ name: '', address: '', rentAmount: '', propertyLink: '' });
      } else {
        console.error('Failed to add property');
      }
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  // Handle editing a property
  const handleEdit = (property) => {
    setEditMode(true);
    setCurrentProperty(property);
  };

  // Handle updating a property
  const handleUpdate = async () => {
    if (!currentProperty) return;

    try {
      const response = await fetch(`http://localhost:8080/api/properties/${currentProperty.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProperty),
      });

      if (response.ok) {
        setProperties((prev) =>
          prev.map((p) => (p.id === currentProperty.id ? currentProperty : p))
        );
        setEditMode(false);
        setCurrentProperty({ id: '', name: '', address: '', rentAmount: '', propertyLink: '' });
      } else {
        console.error('Failed to update property');
      }
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  // Handle deleting a property with confirmation
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    try {
      const response = await fetch(`http://localhost:8080/api/properties/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProperties((prev) => prev.filter((property) => property.id !== id));
      } else {
        console.error('Failed to delete property');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  // Handle property input change for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProperty({ ...currentProperty, [name]: value });
  };

  // Handle input change for adding a new property
  const handleNewPropertyChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  return (
    <div>
      <h2>Manage Properties</h2>
      <div>
        <h3>Add Property</h3>
        <input
          type="text"
          name="name"
          value={newProperty.name}
          onChange={handleNewPropertyChange}
          placeholder="Property Name"
        />
        <input
          type="text"
          name="address"
          value={newProperty.address}
          onChange={handleNewPropertyChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="rentAmount"
          value={newProperty.rentAmount}
          onChange={handleNewPropertyChange}
          placeholder="Rent Amount"
        />
        <input
          type="text"
          name="propertyLink"
          value={newProperty.propertyLink}
          onChange={handleNewPropertyChange}
          placeholder="Property Link"
        />
        <button onClick={handleAddProperty}>Add Property</button>
      </div>

      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            {property.name} - {property.address}
            <button onClick={() => handleEdit(property)}>Edit</button>
            <button onClick={() => handleDelete(property.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editMode && (
        <div>
          <h3>Edit Property</h3>
          <input
            type="text"
            name="name"
            value={currentProperty.name}
            onChange={handleInputChange}
            placeholder="Property Name"
          />
          <input
            type="text"
            name="address"
            value={currentProperty.address}
            onChange={handleInputChange}
            placeholder="Address"
          />
          <input
            type="text"
            name="rentAmount"
            value={currentProperty.rentAmount}
            onChange={handleInputChange}
            placeholder="Rent Amount"
          />
          <input
            type="text"
            name="propertyLink"
            value={currentProperty.propertyLink}
            onChange={handleInputChange}
            placeholder="Property Link"
          />
          <button onClick={handleUpdate}>Update Property</button>
        </div>
      )}
    </div>
  );
}

export default ManageProperties;