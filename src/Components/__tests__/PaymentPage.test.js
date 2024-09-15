import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import PaymentPage from '../PaymentPage/PaymentPage.jsx'; // Adjust the import path based on your file structure

jest.mock('../../appwrite', () => ({
  submitPayment: jest.fn(() => Promise.resolve('12345')),
  fetchPaymentStatus: jest.fn((paymentId) =>
    paymentId === '12345' ? Promise.resolve('success') : Promise.resolve('pending')
  ),
}));

describe('PaymentPage Component', () => {
  test('renders form fields and submit button', () => {
    render(<PaymentPage />);

    // Check for form fields by using correct queries
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Family Name:')).toBeInTheDocument();  // Corrected the label
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone:')).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  test('displays waiting message when payment is pending', async () => {
    render(<PaymentPage/>);

    // Simulate filling out the form
    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Family Name:'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone:'), { target: { value: '123456789' } });

    // Simulate form submission
    fireEvent.click(screen.getByText(/Submit/i));

    // Check for the "waiting for admin confirmation" message
    await waitFor(() => {
      expect(screen.getByText('Waiting for admin confirmation...')).toBeInTheDocument();
    });
  });

  test('displays success message after payment succeeds', async () => {
    render(<PaymentPage />);

    // Simulate filling out the form
    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Family Name:'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone:'), { target: { value: '123456789' } });

    // Simulate form submission
    fireEvent.click(screen.getByText(/Submit/i));


  });
});
