import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import custom matchers
import Footer from '../Footer/Footer.jsx'; // Adjust this import based on your directory structure

describe('Footer Component', () => {
  test('renders all sections and important links', () => {
    render(<Footer />);

    
    

    // Check for specific links in the footer
    expect(screen.getByText('Information')).toBeInTheDocument();
    expect(screen.getByText('Our Servicesn')).toBeInTheDocument(); // Check for typo in 'Our Servicesn'
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('More Search')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('About xbox')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();

    // Check for contact information
    expect(screen.getByText('+91 9999 999 999')).toBeInTheDocument();
    expect(screen.getByText('youremailid.com')).toBeInTheDocument();

    
    // Check for footer bottom section text and links
    expect(screen.getByText(/All Rights Reserved/i)).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Terms & Condition')).toBeInTheDocument();
  });
});
