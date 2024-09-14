import React, { useState } from 'react';
import { fetchFunctionData } from '../../appwrite';  
import { useCart } from '../Context/CartContext';  
import './DiscountInput.css';  

const DiscountComponent = () => {
  const { cartItems, calculateDiscountedPrice, setDiscountedPrice } = useCart();  // Access setDiscountedPrice from context

  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  // Calculate the total price of all items in the cart without any discount from the code
  const totalPrice = cartItems.reduce((total, item) => {
    const itemDiscountedPrice = calculateDiscountedPrice(item);  // Calculate discounted price based on item.sale status
    return total + itemDiscountedPrice * item.quantity;
  }, 0).toFixed(2);

  console.log('Total Price (before any discount):', totalPrice);  // For debugging

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send discount code and full price (without discount) to the backend
      const response = await fetchFunctionData(code, parseFloat(totalPrice));

      if (response.success) {
        setDiscountedPrice(response.discountedPrice);  // Set discounted price in the context
        setMessage(response.message); 
      } else {
        setMessage(response.message);  
      }
    } catch (error) {
      setMessage('Error checking the discount code.');
    }
  };

  return (
    <div className="discount-container">
      <h2 className="discount-heading">Enter Discount Code</h2>
      <form onSubmit={handleSubmit} className="discount-form">
        <input
          type="text"
          placeholder="Enter discount code"
          className="discount-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit" className="discount-button">Apply Discount</button>
      </form>
      {message && <p className="discount-message">{message}</p>}
    </div>
  );
};

export default DiscountComponent;
