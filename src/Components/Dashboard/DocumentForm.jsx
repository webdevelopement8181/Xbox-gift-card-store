import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { databases } from '../../appwrite';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
  Box,
  Switch,
  FormControlLabel
} from '@mui/material';

const DocumentForm = ({ collectionName }) => {
  const navigate = useNavigate();
  const { id: documentId } = useParams(); 

  const collectionMapping = {
    productList: '66cde1ce003c4c7dfb11',
  };

  // Log the incoming collectionName prop
  console.log('Received collectionName:', collectionName);

  // Get collectionId based on collectionName
  const collectionId = collectionMapping[collectionName];

  // Log the collectionId to see if it exists
  console.log('Mapped Collection ID:', collectionId);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    Category: '', // New category field
    IsPopular: false, // New isPopular field
  });

  const [error, setError] = useState('');

  // Fetch existing document if editing
  useEffect(() => {
    const fetchDocument = async () => {
      if (documentId) {
        try {
          const response = await databases.getDocument(
            '66cde1b70007c60cbc12',
            collectionId,
            documentId
          );
          setFormData({
            title: response.title || '',
            description: response.description || '',
            price: response.price || '',
            image: response.image || '',
            Category: response.Category || '', // Set category
            IsPopular: response.IsPopular || false, // Set isPopular
          });
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      }
    };
    fetchDocument();
  }, [collectionId, documentId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSwitchChange = (e) => {
    setFormData({
      ...formData,
      IsPopular: e.target.checked,
    });
  };

  const isValidURL = (value) => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidURL(formData.image)) {
      setError('Cover must be a valid URL');
      return;
    }

    if (!formData.Category) {
      setError('Category is required');
      return;
    }

    setError(''); // Clear any previous errors

    try {
      const dataToSubmit = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : 0, // Ensure price is a float
      };

      if (documentId) {
        await databases.updateDocument(
          '66cde1b70007c60cbc12',
          collectionId,
          documentId,
          dataToSubmit
        );
      } else {
        await databases.createDocument(
          '66cde1b70007c60cbc12',
          collectionId,
          'unique()',
          dataToSubmit
        );
      }
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, px: { xs: 6, md: 8 }, py: { xs: 2, md: 4 } ,marginLeft:{md:'30px',lg:'400px' , sm:'80px', xs:'35px'} }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {documentId ? 'Edit Product' : 'Create Product'}
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                sx={{ mb: { xs: 2, md: 0 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number"
                inputProps={{ step: '0.01' }}
                required
                sx={{ mb: { xs: 2, md: 0 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Category"
                id="Category"
                name="Category"
                value={formData.Category}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.IsPopular}
                    onChange={handleSwitchChange}
                    name="IsPopular"
                    color="primary"
                  />
                }
                label="Is Popular"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, width: { xs: '100%', md: '50%' }, mx: 'auto', display: 'block' }}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

DocumentForm.propTypes = {
  collectionName: PropTypes.string.isRequired, // collectionName must be a string and is required
};

export default DocumentForm;
