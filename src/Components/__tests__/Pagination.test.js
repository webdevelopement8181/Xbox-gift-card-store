import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';  // Import jest-dom for custom matchers
import Pagination from '../Pagination/Pagination.jsx';  // Adjust the import based on your file structure

test('renders Pagination component and interacts with buttons', () => {
  const mockPaginate = jest.fn();
  
  render(
    <Pagination
      productsPerPage={10}
      totalProducts={50} // Total products: 5 pages
      paginate={mockPaginate}
      currentPage={1}
    />
  );

  // Check if the static text "this is the pagination!" is present
  expect(screen.getByText('this is the pagination!')).toBeInTheDocument();

  // Check if page numbers are rendered (5 pages in total)
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('3')).toBeInTheDocument();
  expect(screen.getByText('4')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();

  // Simulate clicking on page 2
  fireEvent.click(screen.getByText('2'));
  expect(mockPaginate).toHaveBeenCalledWith(2);

  // Check if "Next" button is present and simulate clicking it
  const nextButton = screen.getByText('Next');
  expect(nextButton).toBeInTheDocument();
  fireEvent.click(nextButton);
  expect(mockPaginate).toHaveBeenCalledWith(2); // Next from page 1 should go to page 2

  // Since currentPage is 1, "Previous" should not be rendered.
  expect(screen.queryByText('Previous')).not.toBeInTheDocument();
});
