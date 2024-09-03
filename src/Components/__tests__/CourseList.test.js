import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CoursesList from '../CourseList/CourseList';
import { databases } from '../../appwrite'; 
// Mocking the appwrite databases
jest.mock('../../appwrite', () => ({
  databases: {
    listDocuments: jest.fn(),
  },
}));

describe('CoursesList component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('handles error in fetching courses', async () => {
    // Mock rejection before rendering the component
    databases.listDocuments.mockRejectedValueOnce(new Error('Fetch error'));

    const { getByText } = render(
      <MemoryRouter>
        <CoursesList />
      </MemoryRouter>
    );

    // Wait for the component to attempt fetching data
    await waitFor(() => {
      expect(databases.listDocuments).toHaveBeenCalledTimes(0);
    });

    // Check if the correct error message is rendered
    expect(getByText('Error fetching courses.')).toBeInTheDocument();
  });
});