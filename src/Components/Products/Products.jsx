import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../appwrite'; 
import CourseCard from '../CourseCard/CourseCards';
import  Pagination from '../Pagination/Pagination'
import './Products.css'; // Import your CSS styles

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: 100 });
  const [sortNewest, setSortNewest] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;  // Number of products to show per page

  const handleFilter = async () => {
    try {
      const offset = (currentPage - 1) * productsPerPage;

      const fetchedProducts = await fetchProducts(
        selectedPriceRange.min,
        selectedPriceRange.max,
        selectedCategory,
        sortNewest,
        productsPerPage, // Limit
        offset           // Offset
      );
      
      setProducts(fetchedProducts);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    handleFilter(); // Call handleFilter whenever filters or pagination change
  }, [selectedCategory, selectedPriceRange, sortNewest, currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Filter by Price, Category, and Sort by Newest</h2>

      {/* Price Range Filter */}
      <div>
        {[
          { min: 10, max: 20, label: "$10 - $20" },
          { min: 20, max: 30, label: "$20 - $30" },
          { min: 30, max: 40, label: "$30 - $40" },
          { min: 40, max: 60, label: "$40 - $60" },
          { min: 60, max: 100, label: "$60 - $100" }
        ].map((range, index) => (
          <button
            key={index}
            onClick={() => setSelectedPriceRange({ min: range.min, max: range.max })}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Category Filter */}
      <div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Gaming">Gaming</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Console Gaming">Console Gaming</option>
        </select>
      </div>

      {/* Sort by Newest */}
      <div>
        <button onClick={() => setSortNewest(!sortNewest)}>
          {sortNewest ? "Sort by Oldest" : "Sort by Newest"}
        </button>
      </div>

      {/* Error Display */}
      {error && <div>Error: {error}</div>}

      {/* Display Products */}
      <div className="products-grid">
        {products.length === 0 ? (
          <div>No products found for the selected filters.</div>
        ) : (
          products.map((product) => (
            <CourseCard
              key={product.$id}
              id={product.$id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
              isPopular={product.isPopular}
            />
          ))
        )}
      </div>

      {/* Pagination Component */}
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={18}  
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Products;
