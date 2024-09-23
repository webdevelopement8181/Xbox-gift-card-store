import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Use BrowserRouter to wrap the component for `useNavigate`
import IconSearchBar from '../SearchBar/IconSearchBar'; // Import the component

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('IconSearchBar component', () => {
  test('renders search icon and input appears on hover', () => {
    // Render the component and destructure `container`
    const { container } = render(
      <BrowserRouter>
        <IconSearchBar />
      </BrowserRouter>
    );

    // Check if the SearchIcon is rendered (You can adjust this based on how the icon is implemented)
    expect(container.querySelector('.MuiSvgIcon-root')).toBeInTheDocument(); // Assuming MUI adds the class for icons

    // Check that the input is not rendered initially
    expect(screen.queryByPlaceholderText('Type to Search...')).toBeNull();

    // Simulate mouse hover over the container using the class
    fireEvent.mouseEnter(container.querySelector('.icon-search-bar'));

    // Check that the input appears after hover
    expect(screen.getByPlaceholderText('Type to Search...')).toBeInTheDocument();

    // Simulate typing into the input field
    const input = screen.getByPlaceholderText('Type to Search...');
    fireEvent.change(input, { target: { value: 'test query' } });

    // Check if the input value is updated
    expect(input.value).toBe('test query');
  });
});
