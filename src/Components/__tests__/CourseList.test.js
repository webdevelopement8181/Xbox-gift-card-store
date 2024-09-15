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
    // Reset mocks before each test
    mockNavigate.mockReset();
  });

  test('renders empty cart message when there are no items', () => {
    // Mock the useCart hook to return an empty cart
    useCart.mockReturnValue({
      cartItems: [],
      calculateDiscountedPrice: jest.fn(),
    });

    render(
      <BrowserRouter>
        <CartList />
      </BrowserRouter>
    );

    // Expect to see the empty cart message
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  test('renders cart items and calculates total price', () => {
    // Mock the useCart hook with sample cart items
    useCart.mockReturnValue({
      cartItems: [
        { id: 1, title: 'Product 1', price: 100, quantity: 1, inSale: false },
        { id: 2, title: 'Product 2', price: 200, quantity: 2, inSale: true, discountPercentage: 10 }
      ],
      calculateDiscountedPrice: (item) => (item.inSale ? item.price * 0.9 : item.price),
    });

    render(
      <BrowserRouter>
        <CartList />
      </BrowserRouter>
    );

    // Expect the cart items to be rendered
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();

    // Expect the total price to be calculated correctly (100 + (200 * 0.9 * 2) = 460)
    expect(screen.getByText('Total: $460.00')).toBeInTheDocument();
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
        <CartList />
      </BrowserRouter>
    );

    // Simulate clicking the "+" button to increase quantity
    const increaseButton = screen.getByText('+');
    fireEvent.click(increaseButton);

    // Expect the mock updateQuantity function to be called
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
        <CartList />
      </BrowserRouter>
    );

    // Simulate clicking the trash icon to remove the item
    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    // Expect the mock removeFromCart function to be called
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  test('navigates to payment page on proceed to checkout', () => {
    useCart.mockReturnValue({
      cartItems: [{ id: 1, title: 'Product 1', price: 100, quantity: 1 }],
      calculateDiscountedPrice: (item) => item.price,
    });

    render(
      <BrowserRouter>
        <CartList />
      </BrowserRouter>
    );

    // Simulate clicking the "Proceed to Checkout" button
    const checkoutButton = screen.getByText('Proceed to Checkout');
    fireEvent.click(checkoutButton);

    // Expect the mock navigate function to be called with '/payment'
    expect(mockNavigate).toHaveBeenCalledWith('/payment');
  });
});
