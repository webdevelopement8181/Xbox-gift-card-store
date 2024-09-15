import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { databases, Query } from '../../appwrite';
import './CourseDetails.css';
import { FaDollarSign, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useCart } from '../Context/CartContext';

const CourseDetails = () => {
  const { id } = useParams();
  const [giftCard, setGiftCard] = useState(null);
  const [giftCardDetails, setGiftCardDetails] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { totalItems, addToCart, calculateDiscountedPrice } = useCart();  

  useEffect(() => {
    const fetchGiftCardData = async () => {
      try {
        const giftCardResponse = await databases.getDocument(
          '66cde1b70007c60cbc12', // Database ID
          '66cde1ce003c4c7dfb11', // Collection ID
          id
        );
        
        // Ensure inSale and discountPercentage are part of the response
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
        console.error('Error fetching gift card data:', error);
        setHasError(true);
      }
    };

    fetchGiftCardData();
  }, [id]);

  // Only call calculateDiscountedPrice if giftCard is not null
  const discountedPrice = giftCard ? calculateDiscountedPrice(giftCard) : null;

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(quantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (giftCard) {
      addToCart(giftCard, quantity); // Pass product and selected quantity
    }
  };

  if (hasError) {
    return <div>Error loading gift card details. Please try again later.</div>;
  }

  if (!giftCard) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gift-card-detail-container">
      <div className="line">
        <div className="buy-icon-container">
          <FaShoppingCart className="buy-icon" />
          {totalItems > 0 && (
            <div className="quantity-circle">
              {totalItems} {/* Display total items in cart */}
            </div>
          )}
        </div>
      </div>

      <div className="gift-card-image-section">
        {giftCard?.image && <img src={giftCard.image} alt={giftCard.title} className="gift-card-image" />}
      </div>

      <div className="gift-card-info-section">
        <h1>{giftCard.title}</h1>
        <p>{giftCard.description}</p>
        <p>{giftCardDetails?.detailedDescription}</p>

        <p className="price">
          <FaDollarSign />
          {giftCard.inSale ? (
            <>
              <span className="discounted-price">${discountedPrice}</span> Discounted price
            </>
          ) : (
            <span className="price-value">${giftCard.price}</span> // Regular price if not on sale
          )}
        </p>

        <h3>Quantity</h3>
        <div className="quantity-selector">
          <button onClick={() => handleQuantityChange('decrease')}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange('increase')}>+</button>
        </div>

        <div className="gift-card-details-section">
          <h4>Terms of Use</h4>
          <p>{giftCardDetails?.TermsOfUse}</p>
        </div>

        <div className="action-buttons">
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <FaShoppingCart /> Add to Cart
          </button>
          <button className="add-to-wishlist-btn">
            <FaHeart /> Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;