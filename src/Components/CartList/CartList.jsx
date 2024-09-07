import React from 'react';
import { useCart } from '../Context/CartContext';
import { FaTrash } from 'react-icons/fa';
import './CartList.css'; // Assuming you have CSS for styling

const CartList = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    console.log('Quantity Change for id:', id); // Log the id for quantity change
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity); // Use product id to update the quantity
    }
  };

  // Handle product removal
  const handleRemove = (id) => {
    console.log('Removing item with id:', id); // Log the id to check if it's defined
    removeFromCart(id); // Use product id to remove the item
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item) => {
            // Calculate discounted price if the item is on sale
            const discountedPrice = item.inSale
              ? (item.price - (item.price * item.discountPercentage / 100)).toFixed(2)
              : item.price;

            return (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>

                  {/* Display discounted price if the item is on sale */}
                  {item.inSale ? (
                    <p className="cart-item-price">
                      <span className="original-price">${item.price}</span> {/* Original price with strikethrough */}
                      <span className="discounted-price">${discountedPrice}</span> {/* Discounted price */}
                    </p>
                  ) : (
                    <p className="cart-item-price">${item.price}</p> // Regular price
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
                  onClick={() => handleRemove(item.id)} // Pass the product id to handleRemove
                >
                  <FaTrash size={24} />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="cart-summary">
        {/* Calculate the total, considering discounted prices if applicable */}
        <h2>
          Total: ${cartItems.reduce((total, item) => {
            const itemPrice = item.inSale
              ? item.price - (item.price * item.discountPercentage / 100)
              : item.price;
            return total + itemPrice * item.quantity;
          }, 0).toFixed(2)}
        </h2>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartList;
