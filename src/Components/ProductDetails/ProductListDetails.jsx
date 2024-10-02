import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { databases, Query } from '../../appwrite';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useCart } from '../Context/CartContext';
import { Grid, Button, Typography, Box, Fab, Badge, useMediaQuery, Container } from '@mui/material';

const ProductListDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [giftCard, setGiftCard] = useState(null);
  const [giftCardDetails, setGiftCardDetails] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { totalItems, addToCart, calculateDiscountedPrice } = useCart();  

  const isLargeScreen = useMediaQuery('(min-width:1200px)'); // Detect large screens (laptops and desktops)
  const isTabletScreen = useMediaQuery('(min-width:768px) and (max-width:1199px)'); // Detect tablets

  useEffect(() => {
    const fetchGiftCardData = async () => {
      try {
        const giftCardResponse = await databases.getDocument(
          '66cde1b70007c60cbc12',
          '66cde1ce003c4c7dfb11',
          id
        );
        setGiftCard(giftCardResponse);

        const giftCardDetailsResponse = await databases.listDocuments(
          '66cde1b70007c60cbc12',
          '66cde5d000045bfa07ae',
          [Query.equal('coursrId', id)]
        );
        if (giftCardDetailsResponse.documents.length > 0) {
          setGiftCardDetails(giftCardDetailsResponse.documents[0]);
        }
      } catch (error) {
        setHasError(true);
      }
    };

    fetchGiftCardData();
  }, [id]);

  const handleQuantityChange = useCallback((type) => {
    setQuantity(prevQuantity => {
      if (type === 'increase') return prevQuantity + 1;
      if (type === 'decrease' && prevQuantity > 1) return prevQuantity - 1;
      return prevQuantity;
    });
  }, []);

  const handleAddToCart = useCallback(() => {
    if (giftCard) {
      addToCart(giftCard, quantity);
    }
  }, [giftCard, quantity, addToCart]);

  if (hasError) {
    return <div>Error loading gift card details. Please try again later.</div>;
  }

  if (!giftCard) {
    return <div>Loading...</div>;
  }

  const discountedPrice = giftCard ? calculateDiscountedPrice(giftCard) : null;

  return (
    <Container>
      <Grid container spacing={4} mt={4}>
        <Grid item xs={12} md={6}>
          {/* Image Section */}
          <Box display="flex" justifyContent="center" mb={2}>
            {giftCard?.image && (
              <img 
                src={giftCard.image} 
                alt={giftCard.title} 
                style={{ 
                  width: isLargeScreen ? '80%' : isTabletScreen ? '60%' : '100%', 
                  borderRadius: '10px' 
                }} 
              />
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Info Section */}
          <Typography variant="h4">{giftCard.title}</Typography>
          <Typography 
  variant="body1" 
  mt={2} 
  sx={{ color: 'blue', fontWeight: 'bold', fontSize: '1.2rem', textAlign:'left' }}
>
  {giftCard.description}
</Typography>

<Typography 
  variant="body2" 
  mt={1} 
  sx={{ color: 'gray', lineHeight: '1.5', fontStyle: 'italic', textAlign:'left'  }}
>
  {giftCardDetails?.detailedDescription}
</Typography>


          <Typography variant="h6" mt={2}>
              {giftCard.inSale ? (
              <span style={{ color: 'red' }}>${discountedPrice}</span>
            ) : (
              <span>${giftCard.price}</span>
            )}
          </Typography>

          {/* Quantity Selector */}
          <Typography variant="h6" mt={2}>Quantity</Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <Button variant="contained" onClick={() => handleQuantityChange('decrease')}>-</Button>
            <Typography variant="body1" mx={2}>{quantity}</Typography>
            <Button variant="contained" onClick={() => handleQuantityChange('increase')}>+</Button>
          </Box>

          {/* Terms of Use */}
          <Typography variant="h6" mt={2}>Terms of Use</Typography>
          <Typography variant="body2" mt={1}>{giftCardDetails?.TermsOfUse}</Typography>

          {/* Action Buttons */}
          <Box display="flex" gap={2} mt={3}>
            <Button 
              variant="contained" 
              startIcon={<FaShoppingCart />} 
              onClick={handleAddToCart}
              fullWidth
            >
              Add to Cart
            </Button>
            {/* <Button variant="outlined" startIcon={<FaHeart />} fullWidth>
              Add to Wishlist
            </Button> */}
          </Box>
        </Grid>
      </Grid>

      {/* Floating Action Button for Cart */}
      <Fab 
        color="primary" 
        aria-label="cart" 
        onClick={() => navigate('/cart')} 
        style={{
          position: 'fixed', 
         top: '20px', 
          left: '20px'
        }}
      >
        <Badge badgeContent={totalItems} color="secondary">
          <FaShoppingCart />
        </Badge>
      </Fab>
    </Container>
  );
};

export default ProductListDetails;
