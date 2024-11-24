import React, { useEffect, useState } from 'react';

function PropertyListings() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // For search bar
  const [rentRange, setRentRange] = useState({ min: 0, max: 10000 }); // Rent range filter

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/properties');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data); // Initialize filtered list
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

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

  const handleResetFilters = () => {
    setSearchTerm('');
    setRentRange({ min: 0, max: 10000 });
    setFilteredProperties(properties); // Reset to all properties
  };

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Available Properties</h2>

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

      {/* Property Listings */}
      {filteredProperties.length > 0 ? (
        <div className="property-list">
          {filteredProperties.map((property) => (
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
        <p>No properties found.</p>
      )}
    </div>
  );
}

export default PropertyListings;