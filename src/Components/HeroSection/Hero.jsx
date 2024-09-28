import React, { useMemo } from 'react';
import Slider from 'react-slick';
import { useTheme, useMediaQuery } from '@mui/material';
import './Hero.css';  
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Mobile and desktop images
import mobileImg1 from '../../assets/img/mobileImg1.webp';
import mobileImg2 from '../../assets/img/mobileImg2.webp';
import desktopImg1 from '../../assets/img/deskImg1.webp';
import desktopImg2 from '../../assets/img/deskImg2.webp';

const Hero = () => {
  const theme = useTheme();
  
  // Detect screen size using Material-UI's breakpoints
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // mobile screens (xs, sm)
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md')); // tablet (sm to md)
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md')); // desktop screens (md and up)

  // Adjust the slider settings based on screen size
  const settings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  }), []);

  // Conditionally choose images based on screen size
  const images = useMemo(() => {
    if (isSmallScreen || isMediumScreen) {
      return [mobileImg1 , mobileImg2]; // Use mobile images for small and medium screens
    } else if (isLargeScreen) {
      return [desktopImg1, desktopImg2]; // Use desktop images for large screens
    }
  }, [isSmallScreen, isMediumScreen, isLargeScreen]);

  const renderSlides = () => {
    return images.map((image, index) => (
      <div key={index} className="slide">
        <img 
          src={image} 
          alt={`Slide ${index + 1}`} 
          loading="lazy" 
          style={{ 
            width: '100%', 
            height: isSmallScreen ? '250px' : isMediumScreen ? '400px' : '800px',  // Adjust height based on screen size
            objectFit: 'cover'  // Ensure image fits well in different screen sizes
          }} 
        />
      </div>
    ));
  };

  return (
    <div className="hero" style={{
      width: isSmallScreen ? '100%' : isMediumScreen ? '80%' : '100%',
      height: isSmallScreen ? '350px' : isMediumScreen ? '700px' : '600px',
      margin: '0 auto',  // Center the slider
     
    }}>
      <Slider {...settings}>
        {renderSlides()}
      </Slider>
    </div>
  );
};

export default Hero;
