import { FaTimesCircle } from 'react-icons/fa';
import './FailureMessage.css';

const FailureMessage = () => {
  return (
    <div className="failure-message">
      <FaTimesCircle className="failure-icon" />
      <h2>Payment failed!</h2>
      <p>
        There was an issue with your payment. Please try again.
      </p>
    </div>
  );
};

export default FailureMessage;
