import React from 'react';
import { Helmet } from 'react-helmet';  

const Contact = () => {
  return (
    <div>
      {/* Helmet for SEO */}
      <Helmet>
        <title>Contact Us | Your Brand</title>
        <meta name="description" content="Get in touch with Your Brand for any inquiries, support, or feedback. We're here to help!" />
        <link rel="canonical" href="" />
      </Helmet>

      <h1>Contact Us</h1>
      <p>If you have any questions or need assistance, feel free to reach out to us via our contact form or email.</p>
    </div>
  );
};

export default Contact;
