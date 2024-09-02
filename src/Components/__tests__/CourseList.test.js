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

// Mocking the Slider component from react-slick
jest.mock('react-slick', () => (props) => <div>{props.children}</div>);

describe('CoursesList component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches and displays courses', async () => {
    // Mock response
    const mockCourses = [
      { $id: '1', title: 'Course 1', description: 'Description 1', price: 100, image: 'image1.jpg' },
      { $id: '2', title: 'Course 2', description: 'Description 2', price: 200, image: 'image2.jpg' },
    ];

    databases.listDocuments.mockResolvedValue({ documents: mockCourses });

    const { getByText } = render(
      <MemoryRouter>
        <CoursesList />
      </MemoryRouter>
    );

    // Check that loading text is initially present
    await waitFor(() => expect(databases.listDocuments).toHaveBeenCalled());

    // Check that course titles are rendered
    expect(getByText('Course 1')).toBeInTheDocument();
    expect(getByText('Course 2')).toBeInTheDocument();
  });

  test('handles error in fetching courses', async () => {
    // Mock rejection
    databases.listDocuments.mockRejectedValue(new Error('Fetch error'));
  
    const { getByText } = render(
      <MemoryRouter>
        <CoursesList />
      </MemoryRouter>
    );
  
    // Wait for the component to attempt fetching data
    await waitFor(() => expect(databases.listDocuments).toHaveBeenCalled());
  
    // Check if the correct error message is rendered

    expect(getByText('Error fetching courses.')).toBeInTheDocument();
  
  });
});
