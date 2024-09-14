import { FaCheckCircle } from 'react-icons/fa';
import './SucessMessage.css';

const SuccessMessage = () => {
  return (
    <div className="success-message">
      <FaCheckCircle className="success-icon" />
      <h2>Payment successful!</h2>
      <p>
        The order confirmation has been sent to your email.
      </p>
    </div>
  );
};

export default SuccessMessage;
