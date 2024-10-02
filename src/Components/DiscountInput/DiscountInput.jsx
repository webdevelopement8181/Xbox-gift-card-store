import React, { useState } from 'react';
import { fetchFunctionData } from '../../appwrite';  
import { useCart } from '../Context/CartContext';  
import { Box, TextField, Button, Typography, InputAdornment } from '@mui/material';
import { FaTag } from 'react-icons/fa';

const DiscountComponent = () => {
  const { cartItems, calculateDiscountedPrice, setDiscountedPrice } = useCart();

  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const totalPrice = cartItems.reduce((total, item) => {
    const itemDiscountedPrice = calculateDiscountedPrice(item);
    return total + itemDiscountedPrice * item.quantity;
  }, 0).toFixed(2);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetchFunctionData(code, parseFloat(totalPrice));

      if (response.success) {
        setDiscountedPrice(response.discountedPrice);
        setMessage(response.message);
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      setMessage('Error checking the discount code.');
    }
  };

  return (
    <Box mt={8} textAlign="center">
    <Typography sx={{ marginBottom: '29px'}} variant="h6" gutterBottom>
  Enter Discount Code
</Typography>

      <form onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <TextField
            label="Discount Code"
            variant="outlined"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaTag />
                </InputAdornment>
              ),
            }}
            sx={{ width: '300px', marginRight: 2 }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{ height: '56px' }}  // Align button height with TextField
          >
            Apply
          </Button>
        </Box>
      </form>
      {message && (
        <Typography variant="body1" color="error" mt={2}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default DiscountComponent;
