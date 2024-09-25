import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // Import useNavigate
import { submitPayment, fetchPaymentStatus } from '../../appwrite';  // Removed savePaymentProducts

const UserForm = () => {
  const location = useLocation();  
  const navigate = useNavigate();  // Initialize useNavigate
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

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert selectedProducts array to JSON string before saving it
      const productsAsString = JSON.stringify(selectedProducts);

      // Include userId and productsAsString (JSON string) in the payment submission
      const newPaymentId = await submitPayment({
        user_id: userId,  
        Name: formData.Name,  
        FamilyName: formData.FamilyName,
        Email: formData.Email,
        Phone: formData.Phone,
        PaymentStatus: 'pending',
        productList: productsAsString  // Store the selectedProducts as a JSON string
      });
      
      console.log('New Payment ID:', newPaymentId); 
      setPaymentId(newPaymentId); 
      setPaymentStatus('pending');  
      setMessage('');  
    } catch (error) {
      console.error('Error submitting the form:', error);
      setMessage('Error submitting the form.');
    }
  };

  // Poll the payment status from the backend
  useEffect(() => {
    if (paymentId) {
      const intervalId = setInterval(async () => {
        try {
          const status = await fetchPaymentStatus(paymentId, userId);  
          console.log('Fetched Payment Status:', status);  
          setPaymentStatus(status); 

          if (status === 'success') {
            clearInterval(intervalId);
            setMessage('Payment successful! 🎉');
            navigate('/userpanel');  // Navigate to UserPanel on success
          } else if (status === 'failure') {
            clearInterval(intervalId);
            setMessage('Payment failed. Please try again.');
            navigate('/');  // Navigate to home page on failure
          }
        } catch (error) {
          console.error('Error fetching payment status:', error);
        }
      }, 5000); // Check every 5 seconds

      return () => clearInterval(intervalId); // Clear interval on component unmount
    }
  }, [paymentId, userId, navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>  
          <input
            id="name"
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="familyName"> Family Name:</label>
          <input
            id="familyName"
            type="text"
            name="FamilyName"
            value={formData.FamilyName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="text"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      
      {message && <p>{message}</p>}

   
      {paymentStatus === 'pending' && !message && (
        <p>Waiting for admin confirmation...</p>
      )}
    </div>
  );
};

export default UserForm;
