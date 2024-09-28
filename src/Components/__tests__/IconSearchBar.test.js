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

    expect(container.querySelector('.MuiSvgIcon-root')).toBeInTheDocument(); // Assuming MUI adds the class for icons

    expect(screen.queryByPlaceholderText('Type to Search...')).toBeNull();

    fireEvent.mouseEnter(container.querySelector('.icon-search-bar'));

    expect(screen.getByPlaceholderText('Type to Search...')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Type to Search...');
    fireEvent.change(input, { target: { value: 'test query' } });

    expect(input.value).toBe('test query');
  });
});
