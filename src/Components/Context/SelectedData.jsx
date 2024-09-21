import React, { createContext, useState, useContext } from 'react';

// Create the context
const CheckoutDataContext = createContext();

// Create a provider component
export const CheckoutDataProvider = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState(null);

  return (
    <CheckoutDataContext.Provider value={{ checkoutData, setCheckoutData }}>
      {children}
    </CheckoutDataContext.Provider>
  );
};

// Custom hook to use the checkout data
export const useCheckoutData = () => useContext(CheckoutDataContext);
