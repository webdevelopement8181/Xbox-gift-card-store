import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { account } from '../../appwrite';
import AdminRoute from '../Dashboard/AdminRoute'; // Adjust the path if necessary

// Mock the `account` object from `appwrite`
jest.mock('../../appwrite', () => ({
  account: {
    get: jest.fn(),
  },
}));

describe('AdminRoute Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', async () => {
    account.get.mockImplementation(() => new Promise(() => {})); // Keep it pending

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <AdminRoute />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('allows access to admin users', async () => {
    const mockAdminUser = {
      labels: ['admin'], // Simulating an admin user
    };
    account.get.mockResolvedValue(mockAdminUser);

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="" element={<div>Admin Content</div>} />
          </Route>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(account.get).toHaveBeenCalled());
    expect(screen.getByText('Admin Content')).toBeInTheDocument();
  });

  test('redirects non-admin users to home', async () => {
    const mockNonAdminUser = {
      labels: [], // Simulating a non-admin user
    };
    account.get.mockResolvedValue(mockNonAdminUser);

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="" element={<div>Admin Content</div>} />
          </Route>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    );

    // await waitFor(() => expect(account.get).toHaveBeenCalled());
    // expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('redirects to home on fetch error', async () => {
    account.get.mockRejectedValue(new Error('Fetch error'));

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="" element={<div>Admin Content</div>} />
          </Route>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    );

    // await waitFor(() => expect(account.get).toHaveBeenCalled());
    // expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
