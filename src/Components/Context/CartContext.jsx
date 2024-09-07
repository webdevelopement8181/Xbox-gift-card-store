
import React, { createContext, useContext, useState } from 'react';
import { ID, databases } from '../../appwrite'; 


const CartContext = createContext();


export const useCart = () => {
  return useContext(CartContext);
};


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (product, quantity) => {
    try {
      setCartItems((prevItems) => {
        const productId = product.id || product.$id;
  
        if (!productId) {
          console.error('Product is missing an id:', product);
          return prevItems;
        }
  
        // Check if the product already exists in the cart by its unique id
        const existingItem = prevItems.find(item => item.id === productId);
  
        if (existingItem) {
          // If the product exists, update the quantity
          return prevItems.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
  
        // Add the new product to the cart
        return [...prevItems, { ...product, id: productId, quantity }];
      });
  
      // Use ID.unique() to always generate a unique document ID in Appwrite
      await databases.createDocument(
        '66cde1b70007c60cbc12',  // Appwrite database ID
        '66cde1ce003c4c7dfb11',  // Appwrite collection ID for cart items
        ID.unique(),  // unique ID for the document
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
  

  // Function to update the quantity of a product
  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) => 
      prevItems.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  // Total number of items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // 4. Return the Provider to wrap the app's children with cart context
  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};
