import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CourseListDetail from '../Dashboard/CreateListDetail.jsx';
import { databases } from '../../appwrite';

// Mocking the databases object
jest.mock('../../appwrite', () => ({
  databases: {
    listDocuments: jest.fn(),
    deleteDocument: jest.fn(),
  },
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CourseListDetail Component', () => {
  it('fetches and displays course details', async () => {
    const mockDetails = [
      { $id: '1', detailedDescription: 'Detail 1', rating: 5, language: 'English' },
      { $id: '2', detailedDescription: 'Detail 2', rating: 4, language: 'Spanish' },
    ];

    databases.listDocuments.mockResolvedValueOnce({ documents: mockDetails });

    // Render the component
    await act(async () => {
      render(
        <Router>
          <CourseListDetail />
        </Router>
      );
    });

    // Use waitFor to ensure all asynchronous updates are handled
    await waitFor(() => {
      expect(screen.getByText('Detail 1')).toBeInTheDocument();
      expect(screen.getByText('Detail 2')).toBeInTheDocument();
    });
  });

  it('handles a different scenario', async () => {
    const mockDetails = [
      { $id: '1', detailedDescription: 'Detail 1', rating: 5, language: 'English' },
    ];

    databases.listDocuments.mockResolvedValueOnce({ documents: mockDetails });

    // Render the component
    await act(async () => {
      render(
        <Router>
          <CourseListDetail />
        </Router>
      );
    });

    // Use waitFor to ensure all asynchronous updates are handled
    await waitFor(() => {
      expect(screen.getByText('Detail 1')).toBeInTheDocument();
    });
  });
});
