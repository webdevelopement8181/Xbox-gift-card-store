import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../NavBar/NavBar.jsx';
import { useCart } from '../Context/CartContext.jsx';

// Mock the useCart hook
jest.mock('../Context/CartContext', () => ({
  useCart: jest.fn(),
}));

// Mock the useNavigate hook from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Navbar Component', () => {
  const handleLogoutMock = jest.fn();

  beforeEach(() => {
    mockNavigate.mockClear();
    handleLogoutMock.mockClear();
  });

  it('renders the Navbar component with LogIn/SignUp when not authenticated', () => {
    useCart.mockReturnValue({ totalItems: 0 });

    render(
      <BrowserRouter>
        <Navbar isAuthenticated={false} handleLogout={handleLogoutMock} />
      </BrowserRouter>
    );

    // Check if the logo is displayed
    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    // Check if the "LogIn/SignUp" button is displayed
    expect(screen.getByText(/login\/signup/i)).toBeInTheDocument();
  });

  it('shows "Log Out" button when authenticated', () => {
    useCart.mockReturnValue({ totalItems: 0 });

    render(
      <BrowserRouter>
        <Navbar isAuthenticated={true} handleLogout={handleLogoutMock} />
      </BrowserRouter>
    );

    // Check if the "Log Out" button is displayed when authenticated
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  it('calls handleLogout when "Log Out" button is clicked', () => {
    useCart.mockReturnValue({ totalItems: 0 });

    render(
      <BrowserRouter>
        <Navbar isAuthenticated={true} handleLogout={handleLogoutMock} />
      </BrowserRouter>
    );

    // Click the "Log Out" button
    fireEvent.click(screen.getByText('Log Out'));

    // Ensure the handleLogout function is called
    expect(handleLogoutMock).toHaveBeenCalled();
  });

  it('navigates to login page when "LogIn/SignUp" button is clicked and not authenticated', () => {
    useCart.mockReturnValue({ totalItems: 0 });

    render(
      <BrowserRouter>
        <Navbar isAuthenticated={false} handleLogout={handleLogoutMock} />
      </BrowserRouter>
    );

    // Click the "LogIn/SignUp" button
    fireEvent.click(screen.getByText(/login\/signup/i));

    // Ensure the navigate function is called with '/login'
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('navigates to user panel when "User Panel" button is clicked', () => {
    useCart.mockReturnValue({ totalItems: 0 });

    render(
      <BrowserRouter>
        <Navbar isAuthenticated={true} handleLogout={handleLogoutMock} />
      </BrowserRouter>
    );

    // Click the "User Panel" button
    fireEvent.click(screen.getByText('User Panel'));

    // Ensure the navigate function is called with '/userpanel'
    expect(mockNavigate).toHaveBeenCalledWith('/userpanel');
  });
});
