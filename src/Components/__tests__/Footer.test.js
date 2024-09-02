import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer/Footer.jsx'; 

describe('Footer component', () => {
  it('renders the footer component', () => {
    render(<Footer />);
    
    // Check for the presence of certain sections
    expect(screen.getByText('Information')).toBeInTheDocument();
    expect(screen.getByText('Helpful Links')).toBeInTheDocument();
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('renders all links', () => {
    render(<Footer />);
    
    // Check that the links are rendered
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Brands list')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Footer />);
    
    // Check that the contact information is rendered
    expect(screen.getByText('+91 9999 999 999')).toBeInTheDocument();
    expect(screen.getByText('youremailid.com')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
