import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';  
import CartList from '../CartList/CartList.jsx';  
import { useCart } from '../Context/CartContext.jsx';  

jest.mock('../Context/CartContext');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,  
}));

describe('CartList Component', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  test('renders empty cart message when there are no items', () => {
    useCart.mockReturnValue({
      cartItems: [],
      calculateDiscountedPrice: jest.fn(),
    });

    render(
      <BrowserRouter>
        <CartList isAuthenticated={false} />  {/* Pass isAuthenticated as false */}
      </BrowserRouter>
    );

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  test('renders cart items and calculates total price', () => {
    useCart.mockReturnValue({
      cartItems: [
        { id: 1, title: 'Product 1', price: 100, quantity: 1, inSale: false },
        { id: 2, title: 'Product 2', price: 200, quantity: 2, inSale: true, discountPercentage: 10 }
      ],
      calculateDiscountedPrice: (item) => (item.inSale ? item.price * 0.9 : item.price),
    });

    render(
      <BrowserRouter>
        <CartList isAuthenticated={true} />  {/* Pass isAuthenticated as true */}
      </BrowserRouter>
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Total: $460.00')).toBeInTheDocument();  // Validate total
  });

  test('handles quantity change for cart items', () => {
    const mockUpdateQuantity = jest.fn();
    useCart.mockReturnValue({
      cartItems: [{ id: 1, title: 'Product 1', price: 100, quantity: 1 }],
      updateQuantity: mockUpdateQuantity,
      calculateDiscountedPrice: (item) => item.price,
    });

    render(
      <BrowserRouter>
        <CartList isAuthenticated={true} />
      </BrowserRouter>
    );

    const increaseButton = screen.getByText('+');
    fireEvent.click(increaseButton);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 2);
  });

  test('handles removing cart items', () => {
    const mockRemoveFromCart = jest.fn();
    useCart.mockReturnValue({
      cartItems: [{ id: 1, title: 'Product 1', price: 100, quantity: 1 }],
      removeFromCart: mockRemoveFromCart,
      calculateDiscountedPrice: (item) => item.price,
    });

    render(
      <BrowserRouter>
        <CartList isAuthenticated={true} />
      </BrowserRouter>
    );

    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  test('navigates to login page if user is not authenticated when trying to checkout', () => {
    useCart.mockReturnValue({
      cartItems: [{ id: 1, title: 'Product 1', price: 100, quantity: 1 }],
      calculateDiscountedPrice: (item) => item.price,
    });

    render(
      <BrowserRouter>
        <CartList isAuthenticated={false} />  {/* Pass isAuthenticated as false */}
      </BrowserRouter>
    );

    const checkoutButton = screen.getByText('Proceed to Checkout');
    fireEvent.click(checkoutButton);

    expect(mockNavigate).toHaveBeenCalledWith('/login');  // Should navigate to login page
  });

  test('navigates to payment page if user is authenticated when trying to checkout', () => {
    useCart.mockReturnValue({
      cartItems: [{ id: 1, title: 'Product 1', price: 100, quantity: 1 }],
      calculateDiscountedPrice: (item) => item.price,
    });

    render(
      <BrowserRouter>
        <CartList isAuthenticated={true} />  {/* Pass isAuthenticated as true */}
      </BrowserRouter>
    );

    const checkoutButton = screen.getByText('Proceed to Checkout');
    fireEvent.click(checkoutButton);

    expect(mockNavigate).toHaveBeenCalledWith('/payment');  // Should navigate to payment page
  });
});
