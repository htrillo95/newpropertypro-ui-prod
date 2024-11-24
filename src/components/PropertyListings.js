import React, { useEffect, useState } from 'react';

function PropertyListings() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [rentRange, setRentRange] = useState({ min: 0, max: 10000 });
  const [currentPage, setCurrentPage] = useState(1); // Pagination current page
  const itemsPerPage = 5; // Number of properties per page

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
    setCurrentPage(1); // Reset to first page when filters change
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
    setFilteredProperties(properties);
    setCurrentPage(1);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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
      {currentProperties.length > 0 ? (
        <div className="property-list">
          {currentProperties.map((property) => (
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ marginTop: '20px' }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              style={{
                margin: '0 5px',
                padding: '5px 10px',
                backgroundColor: currentPage === index + 1 ? '#007BFF' : '#f0f0f0',
                color: currentPage === index + 1 ? '#fff' : '#000',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default PropertyListings;