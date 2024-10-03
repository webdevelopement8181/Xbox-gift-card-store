import React, { useState, useEffect } from 'react';
import { databases } from '../../appwrite';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Box,
} from '@mui/material';

const DocumentFormDetail = () => {
  const navigate = useNavigate();
  const { id: detailId } = useParams(); 
  const collectionId = '66cde5d000045bfa07ae'; // ID of the ProductDetails collection

  const [formData, setFormData] = useState({
    detailedDescription: '',
    Rating: '',  
    language: '',
    TermsOfUse: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDocument = async () => {
      if (detailId) { 
        try {
          const response = await databases.getDocument('66cde1b70007c60cbc12', collectionId, detailId);
          setFormData({
            detailedDescription: response.detailedDescription || '',
            Rating: response.Rating || '',
            language: response.language || '',
            TermsOfUse: response.TermsOfUse || '',
          });
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      }
    };
    fetchDocument();
  }, [collectionId, detailId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,  // Correctly set the input value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(''); // Clear any previous errors

    try {
      const dataToSubmit = {
        ...formData,
        Rating: formData.Rating,  // Ensure Rating is treated as a string
      };

      if (detailId) {
        // Update existing detail
        await databases.updateDocument('66cde1b70007c60cbc12', collectionId, detailId, dataToSubmit);
        navigate(`/admin/Product-details`); // Redirect to the details list
      } else {
        console.error('Creating new details is not allowed.');
      }
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {detailId ? 'Edit Product Detail' : 'Product Detail'}
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Detailed Description"
                id="detailedDescription"
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Rating"
                id="Rating"
                name="Rating"
                value={formData.Rating}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Language"
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Terms of Use"
                id="TermsOfUse"
                name="TermsOfUse"
                value={formData.TermsOfUse}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, width: '100%' }}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default DocumentFormDetail;
