import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './ProductsCard.css';  

const ProductsCards = ({ id, title, description, price, image, inSale, discountPercentage }) => {
  
  // Calculate discounted price if the product is on sale
  const discountedPrice = inSale ? (price - (price * discountPercentage / 100)).toFixed(2) : price;

  return (
    <Link to={`/product/${id}`} className="course-card-link">
      <div className="course-card">
        
      {inSale && <span className="sale-badge">Sale {discountPercentage}% Off</span>}

        <div className="course-image">
          {image ? (
            <img src={image} alt={title} />
          ) : (
            <div className="image-placeholder">Image</div>
          )}
        </div>

        <div className="course-content">
          <h2 className="course-title">{title}</h2>
          <p className="course-description">{description}</p>

          <div className="course-price">
            {inSale ? (
              <>
                <span className="original-price">${price}</span>
                <span className="discounted-price">${discountedPrice}</span>
              </>
            ) : (
              <span>${price}</span>  // Regular price if not on sale
            )}
          </div>

          <ShoppingCartIcon className="buy-icon" />
        </div>
      </div>
    </Link>
  );
};

ProductsCards.propTypes = {
  id: PropTypes.string.isRequired, 
  title: PropTypes.string.isRequired,  
  description: PropTypes.string.isRequired, 
  price: PropTypes.number.isRequired,  
  image: PropTypes.string,  
  inSale: PropTypes.bool,
  discountPercentage: PropTypes.number
};

export default ProductsCards;
