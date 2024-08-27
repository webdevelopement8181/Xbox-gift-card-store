
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './CourseCard.css';  

const CourseCard = ({ id, title, description, price, instructor, image }) => {
  return (
    <Link to={`/course/${id}`} className="course-card-link">
      <div className="course-card">
        <div className="course-image">
          {image ? <img src={image} alt={title} /> : <div className="image-placeholder">Image</div>}
        </div>
        <div className="course-content">
          <h2 className="course-title">{title}</h2>
          <p className="course-description">{description}</p>
          <p className="course-instructor">Instructor: {instructor}</p>
          <p className="course-price">${price}</p>
        </div>
      </div>
    </Link>
  );
};

CourseCard.propTypes = {
  id: PropTypes.string.isRequired,  // ID must be a string and is required
  title: PropTypes.string.isRequired,  // Title must be a string and is required
  description: PropTypes.string.isRequired,  // Description must be a string and is required
  price: PropTypes.number.isRequired,  // Price must be a number and is required
  instructor: PropTypes.string.isRequired,  // Instructor must be a string and is required
  image: PropTypes.string,  // Image is optional but must be a string if provided
}

export default CourseCard;
