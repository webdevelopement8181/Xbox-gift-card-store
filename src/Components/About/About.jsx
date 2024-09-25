import React from 'react';
import { Helmet } from 'react-helmet';  

const About = () => {
  return (
    <div>
      {/* Helmet for SEO */}
      <Helmet>
        <title>About Us | Your Brand</title>
        <meta name="description" content="Learn more about Your Brand, our mission, and the values we stand by." />
        <link rel="canonical" href="" />
      </Helmet>

      <h1>About Us</h1>
      <p>This is the about page x-box gift card. We are dedicated to providing the best services to our customers.</p>
    </div>
  );
};

export default About;
