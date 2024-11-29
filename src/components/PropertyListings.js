import React, { useEffect, useState } from "react";
import "../styles/PropertyListings.css";

function PropertyListings() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [rentRange, setRentRange] = useState({ min: 0, max: 10000 });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // 4 rows x 5 items

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/properties");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data);
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
    setCurrentPage(1);
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
    setSearchTerm("");
    setRentRange({ min: 0, max: 10000 });
    setFilteredProperties(properties);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div className="properties-container">
        <h1>Featured Properties</h1>

        {/* Filters */}
        <div className="filters-container">
          <input
            type="text"
            placeholder="Search by property name or address"
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar"
          />
          <div className="rent-filters">
            <label>
              Min Rent:
              <input
                type="number"
                name="min"
                value={rentRange.min}
                onChange={handleRentChange}
                className="rent-input"
              />
            </label>
            <label>
              Max Rent:
              <input
                type="number"
                name="max"
                value={rentRange.max}
                onChange={handleRentChange}
                className="rent-input"
              />
            </label>
          </div>
          <button onClick={handleResetFilters} className="reset-button">
            Reset Filters
          </button>
        </div>

        {/* Property Listings */}
        {currentProperties.length > 0 ? (
          <div className="properties-grid">
            {currentProperties.map((property) => (
              <div key={property.id} className="property-card">
                <img
                  src={property.imageUrl}
                  alt={property.name}
                  className="property-image"
                />
                <div className="property-details">
                  <h2 className="property-name">{property.name}</h2>
                  <p className="property-address">{property.address}</p>
                  <p className="property-rent">Rent: ${property.rentAmount}</p>
                  <a
                    href={property.propertyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="property-link"
                  >
                    View Listing
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-properties">No properties found.</p>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`pagination-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="footer-container">
          {/* Left Section */}
          <div className="footer-left">
            <h4>YourLogo</h4>
            <p>Your Address Here, Suite Here</p>
            <p>Philadelphia, PA Zip Code Here</p>
            <p>Email: info@yourbusiness.com</p>
            <p>Phone: (555) 555-5555</p>
          </div>

          {/* Right Section */}
          <div className="footer-right">
            <h4>Explore</h4>
            <ul>
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/properties" className="text-white">Featured Properties</a></li>
              <li><a href="/login" className="text-white">Tenants</a></li>
              <li><a href="/register" className="text-white">Register</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default PropertyListings;