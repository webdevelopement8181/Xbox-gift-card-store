import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitPayment, fetchPaymentStatus } from '../../appwrite';
import { TextField, Button, Grid, Typography, Paper, CircularProgress, Alert } from '@mui/material';

const UserForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, selectedProducts } = location.state || {};

  const [formData, setFormData] = useState({
    Name: '',
    FamilyName: '',
    Email: '',
    Phone: ''
  });

  const [paymentId, setPaymentId] = useState(null);
  const [message, setMessage] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productsAsString = JSON.stringify(selectedProducts);
      const newPaymentId = await submitPayment({
        user_id: userId,
        Name: formData.Name,
        FamilyName: formData.FamilyName,
        Email: formData.Email,
        Phone: formData.Phone,
        PaymentStatus: 'pending',
        productList: productsAsString
      });

      setPaymentId(newPaymentId);
      setPaymentStatus('pending');
      setMessage('');
    } catch (error) {
      console.error('Error submitting the form:', error);
      setMessage('Error submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paymentId) {
      const intervalId = setInterval(async () => {
        try {
          const status = await fetchPaymentStatus(paymentId, userId);
          setPaymentStatus(status);

          if (status === 'success') {
            clearInterval(intervalId);
            setMessage('Payment successful! 🎉');
            navigate('/userpanel');
          } else if (status === 'failure') {
            clearInterval(intervalId);
            setMessage('Payment failed. Please try again.');
            navigate('/');
          }
        } catch (error) {
          console.error('Error fetching payment status:', error);
        }
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [paymentId, userId, navigate]);

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        User Information Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="FamilyName"
              value={formData.FamilyName}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
              type="email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              fullWidth
              size="large"
            >
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {message && (
        <Alert severity={paymentStatus === 'success' ? 'success' : 'error'} sx={{ marginTop: 2 }}>
          {message}
        </Alert>
      )}

      {paymentStatus === 'pending' && !message && (
        <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
          Waiting for admin confirmation...
        </Typography>
      )}
    </Paper>
  );
};

export default UserForm;
