import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../NavBar/NavBar.jsx';

// Mock the useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => {
    const navigateMock = jest.fn();
    return {
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => navigateMock,
    };
  });
  
  describe('Navbar Component', () => {
    const handleLogoutMock = jest.fn();
  
    it('renders the Navbar component', () => {
      render(
        <BrowserRouter>
          <Navbar isAuthenticated={false} handleLogout={handleLogoutMock} />
        </BrowserRouter>
      );
  
      // Check if the logo is displayed
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
  
      // Check if the "Profile" button is displayed when not authenticated
      expect(screen.getByText('Profile')).toBeInTheDocument();
  
      // Check if the "English" button is displayed
      expect(screen.getByText('English')).toBeInTheDocument();
    });
  
    it('shows "Log Out" button when authenticated', () => {
      render(
        <BrowserRouter>
          <Navbar isAuthenticated={true} handleLogout={handleLogoutMock} />
        </BrowserRouter>
      );
  
      // Check if the "Log Out" button is displayed when authenticated
      expect(screen.getByText('Log Out')).toBeInTheDocument();
    });
  
    it('calls handleLogout when "Log Out" button is clicked', () => {
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
  
    it('navigates to login page when "Profile" button is clicked and not authenticated', () => {
      render(
        <BrowserRouter>
          <Navbar isAuthenticated={false} handleLogout={handleLogoutMock} />
        </BrowserRouter>
      );
  
      // Click the "Profile" button
      fireEvent.click(screen.getByText('Profile'));
  
      // Ensure the navigate function is called with '/login'
      const navigate = require('react-router-dom').useNavigate();
      expect(navigate).toHaveBeenCalledWith('/login');
    });
  });