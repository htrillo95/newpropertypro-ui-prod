import React, { useEffect, useState } from 'react';

function PropertyListings() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/properties');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        setProperties(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Available Properties</h2>
      {properties.length > 0 ? (
        <div className="property-list">
          {properties.map((property) => (
            <div key={property.id} className="property-item">
              <h3>{property.name}</h3>
              <p>Address: {property.address}</p>
              <p>Rent Amount: ${property.rentAmount}</p>
              <img src={property.imageUrl} alt={property.name} style={{ width: '100px' }} />
              <a href={property.propertyLink} target="_blank" rel="noopener noreferrer">View Listing</a>
            </div>
          ))}
        </div>
      ) : (
        <p>No properties available.</p>
      )}
    </div>
  );
}

export default PropertyListings;