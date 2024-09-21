import React, { useState, useEffect } from 'react';
import { useCart } from '../Context/CartContext';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import DiscountCodeInput from '../DiscountInput/DiscountInput';
import { databases, account, ID } from '../../appwrite';  
import UserPanel from '../UserPanel/UserPanel';
import './CartList.css';

// Initialize the Appwrite account service to get the user info


const CartList = ({ isAuthenticated }) => {  
  const { cartItems, updateQuantity, removeFromCart, calculateDiscountedPrice, discountedPrice } = useCart();
  const navigate = useNavigate();

  // State to store userId and documentData for UserPanel
  const [userId, setUserId] = useState(null);
  const [documentData, setDocumentData] = useState(null);

  // Fetch the userId when the component mounts
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await account.get(); // Get logged-in user info
        setUserId(user.$id); // Store the user ID in state
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserId();
  }, []);

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

  const handleProceedToCheckout = async () => {
      if (!isAuthenticated) {
          navigate('/login');  // Redirect to login if not authenticated
      } else {
          try {
              // Create an array of selected products with necessary information
              const selectedProducts = cartItems.map(item => ({
                  id: item.id,
                  title: item.title,
                  finalPrice: calculateDiscountedPrice(item),
                  count: item.quantity
              }));

              // Log the selected products for debugging
              console.log('Selected Products:', selectedProducts);

              // Navigate to the payment page, passing selectedProducts and userId as state
              navigate('/payment', {
                state: {
                  selectedProducts,  // Pass the selected products
                  userId             // Pass the user ID
                }
              });
          } catch (error) {
              console.error('Error processing checkout:', error);
          }
      }
  };

  // Calculate the total price, and use the discounted price if it exists
  const totalPrice = discountedPrice !== null 
    ? discountedPrice // Use the discounted price if it has been applied
    : cartItems.reduce((total, item) => {
        const itemPrice = calculateDiscountedPrice(item);
        return total + itemPrice * item.quantity;
      }, 0).toFixed(2); // Otherwise, calculate the total price without any discounts

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item) => {
            const discountedItemPrice = calculateDiscountedPrice(item);

            return (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>

                  {/* Display discounted price if the item is on sale */}
                  {item.inSale ? (
                    <p className="cart-item-price">
                      <span className="original-price">${item.price}</span>
                      <span className="discounted-price">${discountedItemPrice}</span>
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
                  aria-label="Remove item"
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
          Total: ${totalPrice}  {/* Show discounted price if applied, else normal total */}
        </h2>
      
        <DiscountCodeInput />
       
        <div>
            <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>

            {/* Conditionally render UserPanel when documentData is available */}
            {/* <UserPanel documentData={documentData} />  */}

        </div>
      </div>
    </div>
  );
};

export default CartList;
