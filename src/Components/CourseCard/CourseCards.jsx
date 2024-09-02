import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './CourseCard.css';  

const CourseCard = ({ id, title, description, price, image, region }) => {
  return (
    <Link to={`/course/${id}`} className="course-card-link">
      <div className="course-card">
        <div className="course-image">
          {image ? (
            <img src={image} alt={title} />
          ) : (
            <div className="image-placeholder">Image</div>
          )}
        </div>
        <div className="course-content">
          <h2 className="course-title">{title}</h2>
          <p className="course-description">{description}</p>
          <p className="course-region">{region}</p>
          <p className="course-price">From <strong>${price}</strong></p>
          <ShoppingCartIcon className="buy-icon" />ff
        </div>
      </div>
    </Link>
  );
};


CourseCard.propTypes = {
  id: PropTypes.string.isRequired, 
  title: PropTypes.string.isRequired,  
  description: PropTypes.string.isRequired, 
  price: PropTypes.number.isRequired,  
  image: PropTypes.string,  
}

export default CourseCard;
