import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CourseList from '../Dashboard/CourseList';
import { databases } from '../../appwrite';



// Mocking the databases object
jest.mock('../../appwrite', () => ({
  databases: {
    listDocuments: jest.fn(),
  },
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CourseList Component', () => {
  it('fetches and displays courses', async () => {
    const mockCourses = [
      { $id: '1', title: 'Course 1' },
      { $id: '2', title: 'Course 2' },
    ];

    databases.listDocuments.mockResolvedValueOnce({ documents: mockCourses });

    await act(async () => {
      render(
        <Router>
          <CourseList />
        </Router>
      );
    });

    const course1 = await screen.findByText('Course 1');
    const course2 = await screen.findByText('Course 2');

    expect(course1).toBeInTheDocument();
    expect(course2).toBeInTheDocument();
  });

  it('navigates to the course creation page when the create button is clicked', async () => {
    databases.listDocuments.mockResolvedValueOnce({ documents: [] });

    await act(async () => {
      render(
        <Router>
          <CourseList />
        </Router>
      );
    });

    const createButton = screen.getByText('Create');
    fireEvent.click(createButton);

    expect(mockNavigate).toHaveBeenCalledWith('/admin/courses/create');
  });
});
