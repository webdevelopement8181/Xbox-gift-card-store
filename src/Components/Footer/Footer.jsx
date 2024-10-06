import React from "react";
import { Grid, Typography, Link, IconButton, Box } from "@mui/material";
import { Facebook, Instagram, Twitter, Mail, Phone } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#117554', color: '#fff', py: 2 }}>
      <Grid container spacing={3} sx={{ justifyContent: "center", textAlign: "center" }}>
        {/* Information Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Know more
          </Typography>
          <ul>
            <li><Link href="#" color="inherit" underline="hover">Information</Link></li>
            <li><Link href="#" color="inherit" underline="hover">Our Servicesn</Link></li>
            <li><Link href="#" color="inherit" underline="hover">Contact Us</Link></li>
          </ul>
          
        </Grid>

        {/* Helpful Links Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Helpful Links
          </Typography>
          <ul>
            <li><Link href="#" color="inherit" underline="hover">About Us</Link></li>
            <li><Link href="#" color="inherit" underline="hover">More Search</Link></li>
            <li><Link href="#" color="inherit" underline="hover">Blog</Link></li>
          </ul>
        </Grid>

        {/* Our Services Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Our Services
          </Typography>
          <ul>
            <li><Link href="#" color="inherit" underline="hover">About xbox</Link></li>
            <li><Link href="#" color="inherit" underline="hover">Services</Link></li>
            <li><Link href="#" color="inherit" underline="hover">Privacy Policy</Link></li>
          </ul>
        </Grid>

        {/* Contact Us Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Be In Touch With Us
          </Typography>
          <ul>
            <li>
              <Phone /> +91 9999 999 999
            </li>
            <li>
              <Mail /> youremailid.com
            </li>
            <li>
              <IconButton href="#" sx={{ color: '#fff' }}>
                <Facebook />
              </IconButton>
              <IconButton href="#" sx={{ color: '#fff' }}>
                <Instagram />
              </IconButton>
              <IconButton href="#" sx={{ color: '#fff' }}>
                <Twitter />
              </IconButton>
            </li>
          </ul>
        </Grid>
      </Grid>

      {/* Footer Bottom Section */}
      <Box sx={{ mt: 3, borderTop: '1px solid #555', pt: 2, textAlign: 'center' }}>
        <Typography variant="body2">&copy; 2024 @ company.Ltd. | All Rights Reserved</Typography>
        <Box sx={{ mt: 1 }}>
          <Link href="#" color="inherit" underline="hover" sx={{ mr: 2 }}>FAQ</Link>
          <Link href="#" color="inherit" underline="hover" sx={{ mr: 2 }}>Privacy</Link>
          <Link href="#" color="inherit" underline="hover">Terms & Condition</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
