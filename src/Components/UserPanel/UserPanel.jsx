import React, { useEffect, useState } from 'react';
import { account, getUserPayments, updateUser } from '../../appwrite';

const UserPanel = () => {
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
  });
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    newPassword: '', // New password field
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Success message state

  // Fetch userId and user information when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
        setUserInfo({ name: user.name || '', email: user.email });
        setFormData({
          name: user.name || '',
          email: user.email,
          password: '',
          newPassword: '',
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserDetails();
  }, []);

  // Fetch payments and parse the productList string
  useEffect(() => {
    const fetchUserPayments = async () => {
      try {
        if (!userId) return;

        const userPayments = await getUserPayments(userId);
        setPayments(userPayments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payments or products:', error);
      }
    };

    if (userId) {
      fetchUserPayments();
    }
  }, [userId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the error when the user starts typing
    setError('');
    setSuccess('');
  };

  // Handle updating the user's information and password
  const handleUpdate = async () => {
    try {
      if (!formData.password) {
        throw new Error('Current password is required to make changes.');
      }

      await updateUser(formData.email, formData.name, formData.newPassword, formData.password);
      setUserInfo({ name: formData.name, email: formData.email });
      setIsEditing(false);
      setSuccess('User information updated successfully!');
      setError(''); // Clear error on success
    } catch (error) {
      setError(error.message);
      setSuccess(''); // Clear success message on error
    }
  };

  if (loading) {
    return <p>Loading user payments and products...</p>;
  }

  return (
    <div className="user-panel">
      <h2>User Information</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
      {success && <p style={{ color: 'green' }}>{success}</p>} {/* Show success message */}
      {isEditing ? (
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Current Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            New Password (optional):
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </label>
          <br />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {userInfo.name || 'No name provided'}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}

      <h2>Your Payments and Products</h2>
      {payments.length === 0 ? (
        <p>No payments found for this user.</p>
      ) : (
        <div>
          {payments.map((payment, index) => (
            <div key={index} className="payment-section">
              <h3>Payment ID: {payment.$id}</h3>
              {payment.productList && payment.productList !== '[]' ? (
                <table>
                  <thead>
                    <tr>
                      <th>Product Title</th>
                      <th>Final Price</th>
                      <th>Count</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {JSON.parse(payment.productList).map((product, i) => (
                      <tr key={i}>
                        <td>{product.title}</td>
                        <td>${product.finalPrice}</td>
                        <td>{product.count}</td>
                        <td>${product.count * product.finalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No products found in this payment.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPanel;
