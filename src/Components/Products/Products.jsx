import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';  
import { fetchProducts } from '../../appwrite'; 
import ProductsCards from '../ProductsCard/ProductsCards';
import Pagination from '../Pagination/Pagination';
import './Products.css';

// MUI Imports
import { Button, Select, MenuItem, FormControl, InputLabel, ToggleButton, ToggleButtonGroup, Grid, Box, Typography } from '@mui/material';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);  // State to store total products
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: 100 });
  const [sortNewest, setSortNewest] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;  // Number of products per page

  const handleFilter = async () => {
    try {
      const offset = (currentPage - 1) * productsPerPage;

      // Fetch both products and the total number of products
      const { products: fetchedProducts, total } = await fetchProducts(
        selectedPriceRange.min,
        selectedPriceRange.max,
        selectedCategory,
        sortNewest,
        productsPerPage,
        offset
      );

      setProducts(fetchedProducts);  // Set the products for the current page
      setTotalProducts(total);       // Set the total number of products
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    handleFilter(); 
  }, [selectedCategory, selectedPriceRange, sortNewest, currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Helmet for SEO */}
      <Helmet>
        <title>Products | Your Brand</title>
        <meta name="description" content="Browse our wide range of products including Gaming, Entertainment, and Console Gaming categories. Filter by price and sort by the newest items." />
        <link rel="canonical" href="" />
      </Helmet>

      <Typography variant="h4" align="center" gutterBottom>
        Filter by Price, Category, and Sort by Newest
      </Typography>

      {/* Filter Controls */}
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {/* Price Range Filter */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box mb={2}>
            <ToggleButtonGroup
              value={`${selectedPriceRange.min}-${selectedPriceRange.max}`}
              exclusive
              onChange={(e, value) => {
                if (value !== null) {
                  const [min, max] = value.split('-').map(Number);
                  setSelectedPriceRange({ min, max });
                }
              }}
              fullWidth
            >
              {[{ min: 10, max: 20, label: "$10 - $20" }, { min: 20, max: 30, label: "$20 - $30" }, { min: 30, max: 40, label: "$30 - $40" }, { min: 40, max: 60, label: "$40 - $60" }, { min: 60, max: 100, label: "$60 - $100" }].map((range, index) => (
                <ToggleButton key={index} value={`${range.min}-${range.max}`}>
                  {range.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Grid>

        {/* Category Filter */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="Gaming">Gaming</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Console Gaming">Console Gaming</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {/* Sort by Newest */}
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <Box mb={2}>
            <Button
              variant="contained"
              color={sortNewest ? "primary" : "secondary"}
              onClick={() => setSortNewest(!sortNewest)}
              fullWidth
            >
              {sortNewest ? "Sort by Oldest" : "Sort by Newest"}
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Error Display */}
      {error && <Typography color="error">Error: {error}</Typography>}

      {/* Display Products */}
      <Grid container spacing={10} className="products-grid">
        {products.length === 0 ? (
          <Typography>No products found for the selected filters.</Typography>
        ) : (
          products.map((product) => (
            <ProductsCards
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
      </Grid>

      {/* Pagination Component */}
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={totalProducts}  // Pass dynamically fetched total products here
          paginate={paginate}
          currentPage={currentPage}
        />
      </Box>
    </div>
  );
};

export default Products;
