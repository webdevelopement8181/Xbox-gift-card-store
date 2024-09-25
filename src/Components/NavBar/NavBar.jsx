import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconSearchBar from '../SearchBar/IconSearchBar';
import { FaShoppingCart } from 'react-icons/fa'; 
import { useCart } from '../Context/CartContext';

const Navbar = React.memo(({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();
  const [xbox, setXbox] = useState(null);
  const { totalItems } = useCart();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      import('../../assets/img/xbox.png').then((image) => {
        setXbox(image.default);
      });
    }
  }, []);

  const handleLoginClick = useCallback((event) => {
    if (isAuthenticated) {
      event.preventDefault(); 
      const confirmLogout = window.confirm("You are already logged in. Would you like to log out?");
      if (confirmLogout) {
        handleLogout();
      }
    } else {
      navigate('/login'); 
    }
  }, [isAuthenticated, handleLogout, navigate]);

  const navigationItems = ['Products', 'About', 'Contact'].map((text, index) => (
    <Button
      key={index}
      color="inherit"
      sx={{ textTransform: 'none', fontSize: '0.875rem', fontWeight: 500, marginRight: '16px', color: '#1a1a1a' }}
      onClick={() => navigate(`/${text.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`)}
    >
      {text}
    </Button>
  ));

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
      <Toolbar>
        <img src={xbox} alt="Logo" style={{ marginRight: '16px', height: '50px', width: '50px', borderRadius: '10px' }} />
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          <IconSearchBar />
        </Typography>
        {navigationItems}
        <IconButton color="inherit" sx={{ color: '#1a1a1a' }} onClick={() => navigate('/cart')}>
          <FaShoppingCart />
          {totalItems > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '0.75rem'
            }}>
              {totalItems}
            </span>
          )}
        </IconButton>
        {!isAuthenticated ? (
          <IconButton
            color="inherit"
            sx={{ color: '#1a1a1a', fontSize: '0.875rem' }}
            onClick={handleLoginClick}
          >
            <span style={{ fontSize: '0.875rem', marginRight: '15px' }}>LogIn/SignUp</span>
          </IconButton>
        ) : (
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{ textTransform: 'none', color: '#1a1a1a', marginRight: '16px' }}
          >
            Log Out
          </Button>
        )}
        <Button
          color="inherit"
          startIcon={<AccountCircle />}
          sx={{ textTransform: 'none', backgroundColor: '#675D50', color: 'white', padding: '6px 12px', borderRadius: '10px' }}
          onClick={() => navigate('/userpanel')}
        >
          User Panel
        </Button>
      </Toolbar>
    </AppBar>
  );
});

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Navbar;
