import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import CourseDetail from '../CourseDetails/CourseDetails.jsx';
import { databases, Query } from '../../appwrite.js';  

// Mocking useParams from react-router-dom
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

// Mocking the appwrite databases and Query
jest.mock('../../appwrite', () => ({
  databases: {
    getDocument: jest.fn(),
    listDocuments: jest.fn(),
  },
  Query: {
    equal: jest.fn(),
  },
}));

// Minimal Error Boundary component for testing
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Error occurred</div>;
    }

    return this.props.children;
  }
}

describe('CourseDetail component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches course data and renders course details', async () => {
    const mockCourse = {
      title: 'Test Course',
      description: 'Test Description',
      price: 100,
      image: 'test-image-url',
    };

    const mockCourseDetails = {
      detailedDescription: 'Detailed course description',
      learningPoints: ['Point 1', 'Point 2'],
      rating: 4.5,
      language: 'English',
      videoLessons: 10,
    };

    useParams.mockReturnValue({ id: 'test-course-id' });

    databases.getDocument.mockResolvedValue(mockCourse);
    databases.listDocuments.mockResolvedValue({
      documents: [mockCourseDetails],
    });

    const { getByText, getByRole } = render(
      <ErrorBoundary>
        <CourseDetail />
      </ErrorBoundary>
    );

    await waitFor(() => {
      expect(databases.getDocument).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(databases.listDocuments).toHaveBeenCalled();
    });

    expect(getByText('Test Course')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
    expect(getByText('Price: $100')).toBeInTheDocument();
    expect(getByRole('img')).toHaveAttribute('src', 'test-image-url');

    expect(getByText('Detailed course description')).toBeInTheDocument();
    expect(getByText('Point 1')).toBeInTheDocument();
    expect(getByText('Point 2')).toBeInTheDocument();
    expect(getByText('4.5 / 5')).toBeInTheDocument();
    expect(getByText('English')).toBeInTheDocument();
    expect(getByText('10 Video Lessons')).toBeInTheDocument();
  });

  test('renders loading state initially', async () => {
    useParams.mockReturnValue({ id: 'test-course-id' });

    await act(async () => {
      const { getByText } = render(
        <ErrorBoundary>
          <CourseDetail />
        </ErrorBoundary>
      );
    });
  });

  test('handles error when fetching data', async () => {
    // Mock the useParams hook to return a specific ID
    useParams.mockReturnValue({ id: 'test-course-id' });

    // Mock the Appwrite API to throw an error
    databases.getDocument.mockRejectedValue(new Error('Fetch error'));
    databases.listDocuments.mockRejectedValue(new Error('Fetch error'));

    // Suppress the error log for this test
    // const originalError = console.error;
    // console.error = jest.fn();

    const { getByText } = render(
      <ErrorBoundary>
        <CourseDetail />
      </ErrorBoundary>
    );

    // Wait for the component to attempt fetching data
    await waitFor(() => expect(databases.getDocument).toHaveBeenCalled());

    // Ensure that listDocuments is not called since getDocument failed
    expect(databases.listDocuments).not.toHaveBeenCalled();

    // Check that the error state is handled appropriately
    expect(getByText('Error loading course details. Please try again later.')).toBeInTheDocument();

    // Restore original console.error
    // console.error = originalError;
  });
});
