import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TransactionReview from '../Dashboard/Transactions/TransactionReview.jsx';  // Adjust path as needed
import { fetchPendingPayments, updatePaymentStatus } from '../../appwrite.js';  // Mocked imports

// Mock the appwrite functions
jest.mock('../../appwrite.js', () => ({
  fetchPendingPayments: jest.fn(),
  updatePaymentStatus: jest.fn(),
}));

describe('TransactionReview Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders "No transactions found" when there are no transactions', async () => {
    fetchPendingPayments.mockResolvedValueOnce([]);  // Mock no transactions

    render(<TransactionReview />);

    await waitFor(() => {
      expect(screen.getByText('No transactions found.')).toBeInTheDocument();
    });
  });

  test('renders a list of transactions', async () => {
    const mockTransactions = [
      { $id: '1', Name: 'John', FamilyName: 'Doe', Email: 'john@example.com', Phone: '123456', PaymentStatus: 'pending' },
      { $id: '2', Name: 'Jane', FamilyName: 'Smith', Email: 'jane@example.com', Phone: '789012', PaymentStatus: 'success' },
    ];

    fetchPendingPayments.mockResolvedValueOnce(mockTransactions);  // Mock transactions

    render(<TransactionReview />);

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
      expect(screen.getByText('123456')).toBeInTheDocument();
      expect(screen.getByText('789012')).toBeInTheDocument();
    });
  });

  test('handles updating transaction status to success', async () => {
    const mockTransaction = [
      { $id: '1', Name: 'John', FamilyName: 'Doe', Email: 'john@example.com', Phone: '123456', PaymentStatus: 'pending' },
    ];

    fetchPendingPayments.mockResolvedValueOnce(mockTransaction);
    updatePaymentStatus.mockResolvedValueOnce({});  // Mock successful status update

    render(<TransactionReview />);

    // Wait for the transactions to render
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    // Click "Mark as Success"
    fireEvent.click(screen.getByText('Mark as Success'));

 
  });

  test('displays error message when fetching transactions fails', async () => {
    fetchPendingPayments.mockRejectedValueOnce(new Error('Failed to fetch transactions'));

    render(<TransactionReview />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch transactions.')).toBeInTheDocument();
    });
  });
});
