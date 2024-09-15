import React, { useState, useEffect } from 'react';
import { submitPayment, fetchPaymentStatus } from '../../appwrite';  

const UserForm = () => {
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
      const newPaymentId = await submitPayment({
        Name: formData.Name,  
        FamilyName: formData.FamilyName,
        Email: formData.Email,
        Phone: formData.Phone,
        PaymentStatus: 'pending' 
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
          const status = await fetchPaymentStatus(paymentId);  
          console.log('Fetched Payment Status:', status);  
          setPaymentStatus(status); 

          // If the status is no longer 'pending', stop polling
          if (status !== 'pending') {
            clearInterval(intervalId);
            if (status === 'success') {
              setMessage('Payment successful! 🎉');
            } else if (status === 'failure') {
              setMessage('Payment failed. Please try again.');
            }
          }
        } catch (error) {
          console.error('Error fetching payment status:', error);
        }
      }, 5000); // Check every 5 seconds

      return () => clearInterval(intervalId); // Clear interval on component unmount
    }
  }, [paymentId]);

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

      {/* Display payment status or message */}
      {message && <p>{message}</p>}

      {/* Show waiting message only when status is 'pending' */}
      {paymentStatus === 'pending' && !message && (
        <p>Waiting for admin confirmation...</p>
      )}
    </div>
  );
};

export default UserForm;
