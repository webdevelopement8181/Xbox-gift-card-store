import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseDetails from '../CourseDetails/CourseDetails.jsx';
import { useCart } from '../Context/CartContext';
import { databases } from '../../appwrite';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock useCart hook
jest.mock('../Context/CartContext', () => ({
  useCart: jest.fn(),
}));

// Mock Appwrite databases
jest.mock('../../appwrite', () => ({
  databases: {
    getDocument: jest.fn(),
    listDocuments: jest.fn(),
  },
}));

describe('CourseDetails Component', () => {
  const mockAddToCart = jest.fn();

  beforeEach(() => {
    // Mock the useCart hook
    useCart.mockReturnValue({
      totalItems: 0,
      addToCart: mockAddToCart,
    });

    // Mock Appwrite API to return correct data
    databases.getDocument.mockResolvedValue({
      $id: '1',  // Ensure $id is used for Appwrite's Document ID
      title: 'Test Gift Card',  // Expected title
      image: 'test-image.jpg',
      price: 45,
      description: 'Test description',
    });

    databases.listDocuments.mockResolvedValue({
      documents: [
        { detailedDescription: 'Test detailed description', TermsOfUse: 'Test terms' },
      ],
    });
  });

  test('renders loading state initially', () => {
    render(
      <Router>
        <CourseDetails />
      </Router>
    );
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test('renders the gift card details', async () => {

    databases.getDocument.mockResolvedValue({
      $id: '1',
      title: 'Test Gift Card',  // Use the actual title from your mock
      image: 'test-image.jpg',
      price: 45,
      description: 'Test description',
    });
    render(
      <Router>
        <CourseDetails />
      </Router>
    );

    // Wait for data to load
    const title = await screen.findByText('Test Gift Card');
    expect(title).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('$45')).toBeInTheDocument();
  });



  test('renders error message if API fails', async () => {
    // Simulate API failure for getDocument
    databases.getDocument.mockRejectedValueOnce(new Error('API Error'));

    render(
      <Router>
        <CourseDetails />
      </Router>
    );

    const errorMessage = await screen.findByText(/error loading gift card details/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
  test('renders error message if API fails', async () => {
    // Simulate API failure
    databases.getDocument.mockRejectedValueOnce(new Error('API Error'));

    render(
      <Router>
        <CourseDetails />
      </Router>
    );

    const errorMessage = await screen.findByText(/error loading gift card details/i);
    expect(errorMessage).toBeInTheDocument();
  });
