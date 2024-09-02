import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../LogIn/Login.jsx'; // Adjust this path as necessary
import { account } from '../../appwrite';

// Mocking the account object
jest.mock('../../appwrite', () => ({
  account: {
    get: jest.fn(),
    createEmailPasswordSession: jest.fn(),
    create: jest.fn(),
  },
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  it('handles a login attempt', async () => {
    // const mockUser = { $id: '1', email: 'test@example.com', labels: [] };

    // Mock the login and get user functions
    account.createEmailPasswordSession.mockResolvedValueOnce();
    // account.get.mockResolvedValueOnce(mockUser);

    await act(async () => {
      render(
        <Router>
          <Login setIsAuthenticated={jest.fn()} />
        </Router>
      );
    });

 
  


    expect(account.get).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});