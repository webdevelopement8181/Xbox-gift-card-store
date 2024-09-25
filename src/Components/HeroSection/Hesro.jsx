import React, { useMemo } from 'react';
import Slider from 'react-slick';
import './Hero.css';  
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import img3 from '../../assets/img/img3.jpg';
import img2 from '../../assets/img/img2.jpg';

const Hero = () => {
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

  const images = useMemo(() => [img2, img3], []);

  const renderSlides = () => {
    return images.map((image, index) => (
      <div key={index} className="slide">
        <img src={image} alt={`Slide ${index + 1}`} loading="lazy" />
      </div>
    ));
  };

  return (
    <div className="hero">
      <Slider {...settings}>
        {renderSlides()}
      </Slider>
    </div>
  );
};

export default Hero;
