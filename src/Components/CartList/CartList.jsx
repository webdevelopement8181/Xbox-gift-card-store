import React from 'react';
import { useCart } from '../Context/CartContext';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import DiscountCodeInput from '../DiscountInput/DiscountInput';

import './CartList.css';

const CartList = () => {
  const { cartItems, updateQuantity, removeFromCart, calculateDiscountedPrice, discountedPrice } = useCart();  // Use discountedPrice from context
  const navigate = useNavigate();
  
  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  // Handle product removal
  const handleRemove = (id) => {
    removeFromCart(id);
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }
  // Redirect to payment page
  const handleProceedToCheckout = () => {
    navigate('/payment');  // Redirect to the payment page
  };
  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item) => {
            // Use calculateDiscountedPrice from context to get the discounted price
            const discountedPrice = calculateDiscountedPrice(item);

            return (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>

                  {/* Display discounted price if the item is on sale */}
                  {item.inSale ? (
                    <p className="cart-item-price">
                      <span className="original-price">${item.price}</span>
                      <span className="discounted-price">${discountedPrice}</span>
                    </p>
                  ) : (
                    <p className="cart-item-price">${item.price}</p>
                  )}

                  <div className="cart-item-quantity">
                    <button
                      className="cart-item-quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="cart-item-quantity-number">{item.quantity}</span>
                    <button
                      className="cart-item-quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="cart-item-remove-btn"
                  onClick={() => handleRemove(item.id)}
                  aria-label="Remove item"  // Add aria-label here
                >
                  <FaTrash size={24} />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="cart-summary">
        <h2>
          Total: ${discountedPrice ? discountedPrice : cartItems.reduce((total, item) => {
            const itemPrice = calculateDiscountedPrice(item);  // Use calculateDiscountedPrice here
            return total + itemPrice * item.quantity;
          }, 0).toFixed(2)}
        </h2>
      
        <DiscountCodeInput/>
       
        <button className="checkout-btn" onClick={handleProceedToCheckout}>  {/* Use onClick for redirection */}
          Proceed to Checkout
        </button>
        </div>
    </div>
  );
};

export default CartList;
