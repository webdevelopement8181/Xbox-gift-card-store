import React, { useState, useEffect } from 'react';
import { useCart } from '../Context/CartContext';
import { databases, account, ID } from '../../appwrite';  
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import DiscountCodeInput from '../DiscountInput/DiscountInput';
import { Box, Typography, Button } from '@mui/material';


const CartList = ({ isAuthenticated }) => {  
  const { cartItems, updateQuantity, removeFromCart, calculateDiscountedPrice, discountedPrice } = useCart();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await account.get(); 
        setUserId(user.$id); 
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserId();
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleProceedToCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      try {
        const selectedProducts = cartItems.map(item => ({
          id: item.id,
          title: item.title,
          finalPrice: calculateDiscountedPrice(item),
          count: item.quantity
        }));

        navigate('/payment', {
          state: {
            selectedProducts,
            userId
          }
        });
      } catch (error) {
        console.error('Error processing checkout:', error);
      }
    }
  };

  const totalPrice = discountedPrice !== null 
    ? discountedPrice 
    : cartItems.reduce((total, item) => {
        const itemPrice = calculateDiscountedPrice(item);
        return total + itemPrice * item.quantity;
      }, 0).toFixed(2);

  return (
    <div className="cart-container">
      <Typography 
        variant="h4" 
        sx={{ 
          marginBottom: '50px', 
          textAlign: 'center', 
          fontSize: { lg: '2.5rem', md: '2rem', sm: '1.8rem', xs: '1.5rem' }
        }} 
        gutterBottom
      >
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1" align="center">Your cart is empty.</Typography>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item) => {
            const discountedItemPrice = calculateDiscountedPrice(item);

            return (
              <li key={item.id} className="cart-item">
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' }, 
                    alignItems: { md: 'flex-start', xs: 'center' }, 
                    padding: '15px',
                    marginBottom: '20px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    width: { xs: '100%', md: '80%', lg: '70%' }, 
                    margin: '0 auto',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{ 
                      width: '200px', 
                      height: '200px', 
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      marginRight: '20px',
                      marginBottom: { xs: '10px', md: '0' },
                    }} 
                  />
                  <Box className="cart-item-details" sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontSize: { lg: '1.5rem', md: '1.25rem', sm: '1.1rem', xs: '1rem' } 
                      }}
                    >
                      {item.title}
                    </Typography>
                    {item.inSale ? (
                    <Typography
                    variant="body1"
                    sx={{
                      marginLeft: { lg: '30px', md: '40px', sm: '50px', xs: '28px' },
                      marginTop: '10px',
                      fontSize: { xs: '10px' },
                    }}
                  >
                    <span
                     style={{
                      textDecoration: 'line-through',
                      color: 'gray',
                      marginLeft: {
                        lg: '15px',
                        md: '150px',
                        sm: '30px',
                        xs: '20px',
                      },
                      fontSize: '22px', // Keep font size as it is
                    }}
                    >
                      ${item.price}
                    </span>
                    <span
                      style={{
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        marginLeft:'30px' // Set a consistent, responsive size
                      }}
                    >
                      ${discountedItemPrice}
                    </span>
                  </Typography>
                  
                    ) : (
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontSize: { xs: '14px', sm: '16px', md: '18px' } 
                        }}
                      >
                        ${item.price}
                      </Typography>
                    )}

                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: { xs: 'center', md: 'flex-start' }, 
                        marginTop: '10px',
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        sx={{ marginRight: '10px' }}
                      >
                        -
                      </Button>
                      <Typography 
                        sx={{ 
                          lineHeight: '40px', 
                          fontSize: { xs: '14px', sm: '16px', md: '18px' } 
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        sx={{ marginLeft: '10px' }}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                  <Button
                    onClick={() => handleRemove(item.id)}
                    startIcon={<FaTrash />}
                    color="error"
                    variant="contained"
                    sx={{ marginTop: {
                      lg:'70px',
                      md:'90px',
                      sm:'80px',
                     xs: '20px'
                    
                    }, 
                    alignSelf: { xs: 'center', md: 'flex-start' } ,
                    marginRight:{
                      lg:'60px',
                      md:'15px',
                      sm:'290px',
                      xs: '95px'
                    },
                    marginLeft:{
                      md:'150px',
                      xs: 'auto'
                    },
                    padding:{
                      // md:'30px'
                    },
                    backgroundColor:{
                      lg:'blue',
                      md:'red',
                      sm:'yellow',
                      xm: 'gray'
                    },
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </li>
            );
          })}
        </ul>
      )}

      <Box className="cart-summary" sx={{ textAlign: 'center', marginTop: '30px' }}>
        <Typography variant="h5" sx={{ fontSize: { lg: '2rem', sm: '1.75rem', xs: '1.5rem' } }}>
          Total: ${totalPrice}
        </Typography>

        <DiscountCodeInput /> {/* Updated DiscountCodeInput component */}
       
        <Button 
          variant="contained" 
          onClick={handleProceedToCheckout}
          sx={{ 
            marginTop: '20px', 
            padding: '10px 20px', 
            fontSize: { lg: '1.2rem', sm: '1rem', xs: '0.9rem' } 
          }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </div>
  );
};

export default CartList;
