import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DocumentForm from '../Dashboard/DocumentForm';
import { useNavigate, useParams } from 'react-router-dom';
import { databases } from '../../appwrite';

// Mock the useNavigate and useParams hooks
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

// Mock the appwrite databases object
jest.mock('../../appwrite', () => ({
  databases: {
    getDocument: jest.fn(),
    createDocument: jest.fn(),
    updateDocument: jest.fn(),
  },
}));

describe('DocumentForm Component', () => {
  const mockNavigate = jest.fn();
  const mockUseParams = { id: null };

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useParams.mockReturnValue(mockUseParams);
  });

  test('renders the form correctly', () => {
    render(<DocumentForm collectionName="productList" />);
    
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Is Popular/i)).toBeInTheDocument();
  });

  test('handles form submission with valid data', async () => {
    databases.createDocument.mockResolvedValueOnce({}); // Mock createDocument success

    render(<DocumentForm collectionName="productList" />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '25.50' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'A great product' } });
    fireEvent.change(screen.getByLabelText(/Image URL/i), { target: { value: 'https://example.com/image.jpg' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Electronics' } });
    fireEvent.click(screen.getByLabelText(/Is Popular/i)); // Toggle switch

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(databases.createDocument).toHaveBeenCalledWith(
        '66cde1b70007c60cbc12',
        '66cde1ce003c4c7dfb11',
        'unique()',
        expect.objectContaining({
          title: 'Test Product',
          price: 25.50,
          description: 'A great product',
          image: 'https://example.com/image.jpg',
          Category: 'Electronics',
          IsPopular: true,
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith('/admin/products');
    });
  });

  test('displays an error when image URL is invalid', async () => {
    render(<DocumentForm collectionName="productList" />);

    fireEvent.change(screen.getByLabelText(/Image URL/i), { target: { value: 'invalid-url' } });

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(screen.getByText(/Cover must be a valid URL/i)).toBeInTheDocument();
    });
  });

  test('displays an error when category is not provided', async () => {
    render(<DocumentForm collectionName="productList" />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByLabelText(/Image URL/i), { target: { value: 'https://example.com/image.jpg' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: '' } });

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(screen.getByText(/Category is required/i)).toBeInTheDocument();
    });
  });
});
