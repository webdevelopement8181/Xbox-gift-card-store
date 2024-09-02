import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import SearchBar from '../SearchBar/SearchBar'



const Navbar = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();
  const [xbox, setXbox] = useState(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      import('../../assets/xbox.jpg').then((image) => {
        setXbox(image.default); // Set the imported image to state
      });
    }
  }, []);

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
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
      <Toolbar>
        <img src={xbox} alt="Logo" style={{ marginRight: '16px', height: '90px' }} />

        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
<SearchBar/>
        </Typography>

        {['Products', 'About', 'Contact'].map((text, index) => (
          <Button 
            key={index} 
            color="inherit" 
            sx={{ textTransform: 'none', fontSize: '0.875rem', fontWeight: 500, marginRight: '16px', color: '#1a1a1a' }}
            onClick={() => navigate(`/${text.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`)}
          >
            {text}
          </Button>
        ))}

        <IconButton color="inherit" sx={{ color: '#1a1a1a' }}>
      
        </IconButton>

        {!isAuthenticated ? (
          
        <IconButton 
        color="inherit" 
        sx={{ color: '#1a1a1a', fontSize: '0.875rem' }} 
        onClick={handleLoginClick}
      >
       
        <AccountCircle />
        <span style={{ fontSize: '0.875rem', marginRight: '15px' }}>Profile</span>
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
          startIcon={<LanguageIcon />} 
          sx={{ textTransform: 'none', backgroundColor: '#675D50', color: 'white', padding: '6px 12px', borderRadius: '10px' }}
        >
          English
        </Button>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Navbar;
