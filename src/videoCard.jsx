import './assets/VideoCard.css';
import PropTypes from 'prop-types';
import videoSrc from './assets/file_example_MP4_480_1_5MG.mp4'; // Import the video

const VideoCard = ({ title }) => {
  return (
    <div className="card">
      <video controls className="video">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="card-content">
        <h3>{title}</h3>
      </div>
    </div>
  );
};




export default VideoCard;
VideoCard.propTypes = {
    title: PropTypes.string.isRequired,    // title must be a string and is required
  };