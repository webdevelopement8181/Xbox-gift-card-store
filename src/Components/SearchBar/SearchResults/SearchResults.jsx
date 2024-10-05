import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { databases, Query } from '../../../appwrite';  
import ProductsCards from '../../ProductsCard/ProductsCards';
import { Container, Grid, TextField, Typography, Box, Paper } from '@mui/material';
import './SearchResults.css'; // Link the CSS file

const SearchResults = () => {
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [hasError, setHasError] = useState(false);
  const searchParams = new URLSearchParams(location.search);  
  const searchQuery = searchParams.get('q') || '';  

  // Add states for minimum and maximum price
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await databases.listDocuments(
          '66cde1b70007c60cbc12',  //  Appwrite project ID
          '66cde1ce003c4c7dfb11',  //  Appwrite collection ID
          [Query.limit(100)]  // retrieve up to 100 items
        );
        console.log('Fetched Data:', response.documents);
        setCourses(response.documents);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setHasError(true);
      }
    };

    fetchCourses();
  }, []);

  if (hasError) {
    return <Typography variant="h6" color="error" align="center">Error fetching courses.</Typography>;
  }

  const normalizeString = (str) => str.trim().toLowerCase();

  const filteredCourses = courses.filter(course => {
    // Normalize title
    const titleMatches = course.title && normalizeString(course.title).includes(normalizeString(searchQuery));

    // Convert price to a number and check if it matches the range
    const priceMatches = !isNaN(course.price) && 
      (minPrice === '' || course.price >= Number(minPrice)) && 
      (maxPrice === '' || course.price <= Number(maxPrice));

    return titleMatches && priceMatches;  // Return true if both conditions match
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Search Results for "{searchQuery}"
      </Typography>

      {/* Price Filter Inputs */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
        <TextField
          label="Min Price"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          variant="outlined"
        />
        <TextField
          label="Max Price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          variant="outlined"
        />
      </Box>

      {/* Display Courses */}
      <div className="products-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <ProductsCards
              key={course.$id}
              id={course.$id}
              title={course.title}
              description={course.description}
              price={course.price}
              image={course.image}
              inSale={course.inSale}
              discountPercentage={course.discountPercentage}
            />
          ))
        ) : (
          <Typography variant="h6" align="center">
            No results found for "{searchQuery}".
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default SearchResults;
