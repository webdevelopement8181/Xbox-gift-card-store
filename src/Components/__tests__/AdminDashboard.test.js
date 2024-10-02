import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from '../Dashboard/AdminDashboard'; 
import ChartDashboard from '../Dashboard/ChartDashboard';

jest.mock('@mui/material', () => ({
  List: ({ children }) => <ul>{children}</ul>,
  ListItem: ({ children }) => <li>{children}</li>,
  ListItemText: ({ primary }) => <span>{primary}</span>,
  Drawer: ({ children }) => <div>{children}</div>,
}));

jest.mock('../Dashboard/ChartDashboard.jsx', () => () => <div>ChartDashboard Component</div>);

describe('AdminDashboard Component', () => {
  test('renders ChartDashboard on /admin route', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('ChartDashboard Component')).toBeInTheDocument();
  });

  test('renders correct outlet component on /admin/Products route', () => {
    render(
      <MemoryRouter initialEntries={['/admin/Products']}>
        <Routes>
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/admin/Products" element={<div>Manage Products Component</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Manage Products Component')).toBeInTheDocument();
  });

  test('renders correct outlet component on /admin/Product-details route', () => {
    render(
      <MemoryRouter initialEntries={['/admin/Product-details']}>
        <Routes>
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/admin/Product-details" element={<div>Manage Product Details Component</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Manage Product Details Component')).toBeInTheDocument();
  });

  test('renders correct outlet component on /admin/transaction route', () => {
    render(
      <MemoryRouter initialEntries={['/admin/transaction']}>
        <Routes>
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/admin/transaction" element={<div>Recent Transactions Component</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Recent Transactions Component')).toBeInTheDocument();
  });
});
