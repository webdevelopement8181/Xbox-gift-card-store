import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import CourseDetails from '../CourseDetails/CourseDetails'; 
import { useCart } from '../Context/CartContext';
import { databases } from '../../appwrite';

// Mock the required modules
jest.mock('../../appwrite');
jest.mock('../Context/CartContext.jsx');

describe('CourseDetails Component', () => {
  const mockUseCart = {
    totalItems: 3,
    addToCart: jest.fn(),
    calculateDiscountedPrice: jest.fn(),
  };

  beforeEach(() => {
    useCart.mockReturnValue(mockUseCart);
  });

  test('renders loading state initially', () => {
    render(
      <BrowserRouter>
        <CourseDetails />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error message when data fetching fails', async () => {
    databases.getDocument.mockRejectedValue(new Error('Error fetching data'));

    render(
      <BrowserRouter>
        <CourseDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/error loading gift card details/i)).toBeInTheDocument();
    });
  });

  test('renders gift card details correctly', async () => {
    const mockGiftCard = {
      title: 'Sample Gift Card',
      description: 'This is a sample description.',
      price: 100,
      inSale: false,
      image: 'image-url',
    };

    databases.getDocument.mockResolvedValue(mockGiftCard);
    databases.listDocuments.mockResolvedValue({ documents: [] });

    render(
      <BrowserRouter>
        <CourseDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Sample Gift Card')).toBeInTheDocument();
      expect(screen.getByText('This is a sample description.')).toBeInTheDocument();
      expect(screen.getByText('$100')).toBeInTheDocument();
    });
  });
});
