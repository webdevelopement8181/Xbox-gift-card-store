import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import DocumentForm from '../Dashboard/DocumentForm.jsx'; 
import { databases } from '../../appwrite';

// Mocking the useParams hook from react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
    useNavigate: jest.fn(),
  }));
  
  // Mocking the appwrite databases object
  jest.mock('../../appwrite', () => ({
    databases: {
      getDocument: jest.fn(),
      createDocument: jest.fn(),
      updateDocument: jest.fn(),
    },
  }));
  
  describe('DocumentForm Component', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('renders form fields correctly', async () => {
      // Mock useParams to return no documentId, indicating a create form
      useParams.mockReturnValue({ id: null });
  
      await act(async () => {
        render(
          <Router>
            <DocumentForm collectionName="onlineCourse" />
          </Router>
        );
      });
  
      // Check if form fields are rendered
      expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Image/i)).toBeInTheDocument();
    });
  
    it('allows form submission with valid data', async () => {
      // Mock useParams to return no documentId, indicating a create form
      useParams.mockReturnValue({ id: null });
  
      const mockNavigate = jest.fn();
      jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
  
      await act(async () => {
        render(
          <Router>
            <DocumentForm collectionName="onlineCourse" />
          </Router>
        );
      });
  
      // Simulate user input
      fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Course' } });
      fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Course Description' } });
      fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '99.99' } });
      fireEvent.change(screen.getByLabelText(/Image/i), { target: { value: 'https://example.com/image.jpg' } });
  
      // Simulate form submission
      await act(async () => {
        fireEvent.submit(screen.getByRole('button', { name: /save/i })); // Update 'submit' to 'save'
      });
      
      // Expect createDocument to be called
      expect(databases.createDocument).toHaveBeenCalledWith(
        '66cde1b70007c60cbc12',
        '66cde1ce003c4c7dfb11',
        'unique()',
        {
          title: 'New Course',
          description: 'Course Description',
          price: 99.99,
          image: 'https://example.com/image.jpg',
        }
      );
  
      // Expect navigation after submission
      expect(mockNavigate).toHaveBeenCalledWith('/admin/courses');
    });
  });