import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';  
import Products from '../Products/Products';

// Mock the fetchProducts function to return dummy data
jest.mock('../../appwrite', () => ({
  fetchProducts: jest.fn(() =>
    Promise.resolve({
      products: [
        { $id: '1', title: 'Product 1', description: 'Description 1', price: 10, image: 'image1.jpg', isPopular: true },
        { $id: '2', title: 'Product 2', description: 'Description 2', price: 20, image: 'image2.jpg', isPopular: false }
      ],
      total: 2
    })
  )
}));

test('renders FilteredProducts component and interacts correctly', async () => {
  render(<Products />);

  // Check if the filter text is visible
  expect(screen.getByText(/Filter by Price, Category, and Sort by Newest/i)).toBeInTheDocument();

  // Check if the price range buttons are present
  expect(screen.getByText("$10 - $20")).toBeInTheDocument();
  expect(screen.getByText("$20 - $30")).toBeInTheDocument();

  // Check if category dropdown exists
  expect(screen.getByLabelText('Category')).toBeInTheDocument();

  // Check if sort button exists
  const sortButton = screen.getByText("Sort by Newest");
  expect(sortButton).toBeInTheDocument();

  // Simulate click to change sorting
  fireEvent.click(sortButton);
  expect(screen.getByText("Sort by Oldest")).toBeInTheDocument();

  // Simulate opening the Select dropdown
  fireEvent.mouseDown(screen.getByLabelText('Category'));


});
