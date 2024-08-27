import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

  const handleLoginClick = (event) => {
    if (isAuthenticated) {
      event.preventDefault(); // Prevent navigation to the login page
      const confirmLogout = window.confirm("You are already logged in. Would you like to log out?");
      if (confirmLogout) {
        handleLogout();
      }
    } else {
      navigate('/login'); // Navigate to login if not authenticated
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyApp</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        {!isAuthenticated ? (
          <li><Link to="/login" onClick={handleLoginClick}>Log In</Link></li>
        ) : (
          <li><button onClick={handleLogout} className="logout-button">Log Out</button></li>
        )}
      </ul>
    </nav>
  );
};
Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired, // isAuthenticated must be a boolean and is required
  handleLogout: PropTypes.func.isRequired,   // handleLogout must be a function and is required
};
export default Navbar;
