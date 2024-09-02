
import Slider from 'react-slick';
import './Hero.css';  
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import img3 from '../../assets/img3.jpg';
import img2 from '../../assets/img2.jpg';



const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const images = [
img2,img3
    
];

  return (
    <div className="hero">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
