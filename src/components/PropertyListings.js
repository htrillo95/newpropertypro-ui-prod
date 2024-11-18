import React, { useEffect, useState } from 'react';

function PropertyListings() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  // Fetch properties from the backend
  useEffect(() => {
    fetch('http://localhost:8080/api/properties') // Make sure the URL matches your backend
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch properties'); // Handle response errors
        }
        return response.json();
      })
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading properties...</p>; // Loading indicator
  if (error) return <p style={{ color: 'red' }}>{error}</p>; // Error message

  return (
    <div>
      <h2>Available Properties</h2>
      <div className="property-list">
        {properties.map((property) => (
          <div key={property.id} className="property-item">
            <h3>{property.name}</h3>
            <p>Address: {property.address}</p>
            <p>Rent Amount: ${property.rentAmount}</p>
            <a href={property.propertyLink} target="_blank" rel="noopener noreferrer">
              View Listing
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyListings;