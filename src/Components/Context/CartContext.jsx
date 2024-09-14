import React, { createContext, useContext, useState } from 'react';
import { ID, databases } from '../../appwrite';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [discountedPrice, setDiscountedPrice] = useState(null); // Store the discounted price

  const addToCart = async (product, quantity) => {
    try {
      setCartItems((prevItems) => {
        const productId = product.id || product.$id;

        if (!productId) {
          console.error('Product is missing an id:', product);
          return prevItems;
        }

        const existingItem = prevItems.find(item => item.id === productId);

        if (existingItem) {
          return prevItems.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        return [...prevItems, { ...product, id: productId, quantity }];
      });

      await databases.createDocument(
        '66cde1b70007c60cbc12',  // Appwrite database ID
        '66cde1ce003c4c7dfb11',  // Appwrite collection ID for cart items
        ID.unique(),
        {
          title: product.title,
          image: product.image,
          price: product.price,
          description: product.description,
          IsPopular: product.IsPopular || false,
          Category: product.Category || 'General',
          CreatedAt: new Date().toISOString(),
        }
      );
    } catch (error) {
      console.error('Failed to add item to cart', error);
    }
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) => 
      prevItems.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const calculateDiscountedPrice = (item) => {
    return item.inSale
      ? (item.price - (item.price * item.discountPercentage / 100)).toFixed(2)
      : item.price;
  };

  return (
    <CartContext.Provider value={{ cartItems, discountedPrice, setDiscountedPrice, addToCart, updateQuantity, removeFromCart, totalItems, calculateDiscountedPrice }}>
      {children}
    </CartContext.Provider>
  );
};
