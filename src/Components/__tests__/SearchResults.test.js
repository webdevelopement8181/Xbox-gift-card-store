import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Use BrowserRouter to wrap the component for `useLocation`
import SearchResults from '../SearchBar/SearchResults/SearchResults.jsx'; // Path to your SearchResults component

// Mock Appwrite API
jest.mock('../../appwrite.js', () => ({
  databases: {
    listDocuments: jest.fn(() => ({
      documents: [
        {
          $id: '1',
          title: 'Test Course 1',
          description: 'Test Description 1',
          price: 100,
          image: 'image1.jpg',
          inSale: true,
          discountPercentage: 10
        },
        {
          $id: '2',
          title: 'Test Course 2',
          description: 'Test Description 2',
          price: 150,
          image: 'image2.jpg',
          inSale: false,
          discountPercentage: 0
        }
      ]
    }))
  },
  Query: {
    limit: jest.fn()
  }
}));

describe('SearchResults component', () => {
  test('renders search results with mock data', async () => {
    // Render the component
    render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    // Check if the heading is rendered
    expect(screen.getByText(/Search Results for/)).toBeInTheDocument();

    // Check if the courses are rendered from the mocked API
    expect(await screen.findByText('Test Course 1')).toBeInTheDocument();
    expect(await screen.findByText('Test Course 2')).toBeInTheDocument();
  });

  test('renders no results message when no courses match', async () => {
    // Mock Appwrite to return an empty array
    jest.spyOn(require('../../appwrite.js').databases, 'listDocuments').mockResolvedValueOnce({
      documents: []
    });

    // Render the component
    render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    // Check if the "No results found" message is displayed
    expect(await screen.findByText(/No results found/)).toBeInTheDocument();
  });
});
