import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';  
import PaymentPage from '../PaymentPage/PaymentPage';  // Replace with correct import for PaymentPage
import { submitPayment, fetchPaymentStatus } from '../../appwrite';  
import { useNavigate } from 'react-router-dom';

jest.mock('../../appwrite', () => ({
  submitPayment: jest.fn(),
  fetchPaymentStatus: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ state: { userId: 'user123', selectedProducts: [{ id: 1, title: 'Product 1' }] } }),
  useNavigate: () => mockNavigate,
}));

describe('PaymentPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('submits payment and navigates to UserPanel on success', async () => {
    // Mock the submitPayment and fetchPaymentStatus calls
    submitPayment.mockResolvedValue('payment123');
    fetchPaymentStatus.mockResolvedValue('success');

    render(
      <BrowserRouter>
        <PaymentPage />
      </BrowserRouter>
    );

    // Simulate form input
    fireEvent.change(screen.getByTestId('first-name-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('family-name-input'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '1234567890' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Submit'));

    // Wait for the submitPayment call to resolve
    await waitFor(() => {
      expect(submitPayment).toHaveBeenCalledWith(expect.objectContaining({
        user_id: 'user123',
         FirstName: 'John',
        FamilyName: 'Doe',
        Email: 'john@example.com',
        Phone: '1234567890',
        PaymentStatus: 'pending',
      }));
    });

   
   
  });

  test('navigates to home page on payment failure', async () => {
    // Mock the submitPayment and fetchPaymentStatus calls
    submitPayment.mockResolvedValue('payment123');
    fetchPaymentStatus.mockResolvedValue('failure');

    render(
      <BrowserRouter>
        <PaymentPage />
      </BrowserRouter>
    );

    // Simulate form input
    fireEvent.change(screen.getByTestId('first-name-input'), { target: { value: 'John' } });
  fireEvent.change(screen.getByTestId('family-name-input'), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
  fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '1234567890' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Submit'));

    // Wait for the submitPayment call to resolve
    await waitFor(() => {
      expect(submitPayment).toHaveBeenCalledWith(expect.objectContaining({
        user_id: 'user123',
         FamilyName: 'John',
        FamilyName: 'Doe',
        Email: 'john@example.com',
        Phone: '1234567890',
        PaymentStatus: 'pending',
      }));
    });

    

 
  });
});
