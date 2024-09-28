import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Grid, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';

const DiscountBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    right: 21,
    top: 15,
    width:'10%',
    padding: '0 4px',
    borderRadius: '40%',
  },
}));

const ProductsCards = ({ id, title, description, price, image, inSale, discountPercentage }) => {
  const discountedPrice = inSale ? (price - (price * discountPercentage / 100)).toFixed(2) : price;

  return (
    <Grid  item xs={12} sm={6} md={4} lg={3} sx={{ marginRight: '-130px' }}>
      <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
        <Card 
          sx={{ 
            marginBottom:2,
            position: 'relative', 
            padding: 2, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between', 
            width: {
              xs: '50%',   // Full width on extra small screens (mobile)
              sm: '50%',    // 48% width on small screens (tablet)
              md: '70%',    // 32% width on medium screens (desktop)
              lg: '60%'     // 24% width on large screens (large desktop)
            },
            height: {
              xs: 'auto',    // Auto height for small screens
              sm: '400px',   // 350px for tablets
              md: '350px',   // 400px for medium screens
              lg: '450px'    // 450px for large screens
            },  
            transition: 'transform 0.3s',
            '&:hover': { transform: 'translateY(-5px)' }
          }}>
          {inSale && (
            <DiscountBadge badgeContent={`${discountPercentage}%`} />
          )}
          <CardMedia
            component="img"
            image={image || 'placeholder.png'}
            alt={title}
            sx={{
              height: {
                xs: '150px',   // Image height for small screens
                sm: '200px',   // Image height for tablets
                md: '250px',   // Image height for medium screens
                lg: '200px'    // Image height for large screens
              },
              width:{
                xs: '250px',   // Image height for small screens
                sm: '250px',   // Image height for tablets
                md: '350px', 
                lg:'300px',  // Image height for medium screens
                xl: '550px'
              } ,
              // padding :{
              //   xm: '10px',   
                
              // },
              objectFit: 'cover' 
            }}
          />
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography 
  variant="h6" 
  gutterBottom 
  sx={{
    display: '-webkit-box', 
    textAlign: 'center',
    WebkitLineClamp: {
      xs: 2,  // 2 lines for extra small screens
      sm: 3,  // 3 lines for small screens
      md: 2,  // 2 lines for medium screens
      lg: 2 ,  // 3 lines for large screens
    },
    marginTop: {
      xs: '25px',   // Image height for small screens
      sm: '20px',   // Image height for tablets
      md: '22px',   // Image height for medium screens
      lg: '15px'   
    },
    WebkitBoxOrient: 'vertical', 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: {
      xs: '1rem',   // Font size for extra small screens (mobile)
      sm: '1.1rem', // Font size for small screens (tablet)
      md: '1.25rem', // Font size for medium screens (desktop)
      lg: '1.3rem' // Font size for large screens (large desktop)
    },
    marginBottom: {
      xs: '8px',  // Margin for extra small screens
      sm: '12px', // Margin for small screens
      md: '16px', // Margin for medium screens
      lg: '20px'  // Margin for large screens
    },
 
  }}>
  {title}
</Typography>

<Typography
  variant="body2" 
  color="textSecondary" 
  sx={{
    textAlign: 'left',
    display: '-webkit-box', 
    WebkitLineClamp: 3,  // Limit to 3 lines
    WebkitBoxOrient: 'vertical', 
    overflow: 'hidden',  // Ensures the overflow is hidden
    textOverflow: 'ellipsis',  // Adds ellipsis when truncated
    whiteSpace: 'normal',  // Allows normal text wrapping behavior
    lineHeight: '1.7', // Helps with consistent line spacing
    flexGrow: 1  
  }}>
  {description}
</Typography>



            <Typography variant="h6" sx={{ marginTop: 'auto' }}>
              {inSale ? (
                <>
                  <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'grey', marginRight: 1 }} component="span">${price}</Typography>
                  <Typography component="span" color="error">${discountedPrice}</Typography>
                </>
              ) : (
                <span>${price}</span>
              )}
            </Typography>
            <IconButton sx={{ marginTop: 'auto', alignSelf: 'center' }}>
              <ShoppingCartIcon />
            </IconButton>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

ProductsCards.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  inSale: PropTypes.bool,
  discountPercentage: PropTypes.number,
};

export default ProductsCards;
