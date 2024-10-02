import React, { useEffect, useState } from 'react';
import { account, getUserPayments, updateUser } from '../../appwrite';
import { Grid, Box, Typography, Button, TextField, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import profileImage from '../../assets/img/profile.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserPanel = () => {
    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        profileImage: '',
    });
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const user = await account.get();
                setUserId(user.$id);
                setUserInfo({ name: user.name || '', email: user.email, profileImage: user.profileImage || '' });
                setFormData({
                    name: user.name || '',
                    email: user.email,
                });
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        fetchUserDetails();
    }, []);

    useEffect(() => {
        const fetchUserPayments = async () => {
            try {
                if (!userId) return;

                const userPayments = await getUserPayments(userId);
                setPayments(userPayments);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        if (userId) {
            fetchUserPayments();
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
    };

    const handleUpdate = async () => {
        try {
            await updateUser(formData.email, formData.name);
            setUserInfo({ ...userInfo, name: formData.name, email: formData.email });
            setIsEditing(false);
            toast.success('User information updated successfully!');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleChangePassword = async () => {
        try {
            if (!passwordData.currentPassword || !passwordData.newPassword) {
                throw new Error('Both current and new passwords are required.');
            }

            await updateUser(formData.email, userInfo.name, passwordData.newPassword, passwordData.currentPassword);
            toast.success('Password changed successfully!');
            setPasswordData({ currentPassword: '', newPassword: '' });
            setIsChangingPassword(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (loading) {
        return <Typography>Loading user payments and products...</Typography>;
    }

    return (
        <Grid container spacing={3} justifyContent="center">
            <ToastContainer />
            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                    {/* Image Section */}
                    <Box mb={2} display="flex" justifyContent="center">
                        <img
                            src={profileImage}
                            alt="Profile"
                            style={{ width: 80, height: 80, borderRadius: '50%' }}
                        />
                    </Box>

                    {isEditing ? (
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', // Center items
                                justifyContent: 'center' // Horizontally center items
                            }}
                        >
                            <TextField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                sx={{ maxWidth: '300px' }} // Limit the width for better layout
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                sx={{ maxWidth: '300px' }} // Limit the width for better layout
                            />
                            <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mr: 2 }}>
                                    Save
                                </Button>
                                <Button variant="outlined" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                                <Button variant="outlined" onClick={() => setIsChangingPassword(!isChangingPassword)} sx={{ ml: 2 }}>
                                    Change Password
                                </Button>
                            </Box>
                            {isChangingPassword && (
                                <Box mt={3} sx={{ maxWidth: '300px', textAlign: 'center' }}>
                                    <Typography variant="h6">Change Password</Typography>
                                    <TextField
                                        label="Current Password"
                                        name="currentPassword"
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        label="New Password"
                                        name="newPassword"
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        fullWidth
                                        margin="normal"
                                        required
                                    />
                                    <Button variant="contained" color="primary" onClick={handleChangePassword} sx={{ mt: 2 }}>
                                        Change Password
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    ) : (
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', // Center profile info
                            justifyContent: 'center' 
                        }}>
                            <Typography><strong>Name:</strong> {userInfo.name || 'No name provided'}</Typography>
                            <Typography><strong>Email:</strong> {userInfo.email}</Typography>
                            <Box mt={2}>
                                <Button variant="contained" onClick={() => setIsEditing(true)}>
                                    Edit
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Your Payments and Products</Typography>
                    {payments.length === 0 ? (
                        <Typography>No payments found for this user.</Typography>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: '#6A9AB0' }}>Product Title</TableCell>
                                    <TableCell sx={{ backgroundColor: '#6A9AB0' }}>Count</TableCell>
                                    <TableCell sx={{ backgroundColor: '#6A9AB0' }}>Final Price</TableCell>
                                    <TableCell sx={{ backgroundColor: '#6A9AB0' }}>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {payments.map((payment, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{JSON.parse(payment.productList)[0]?.title || 'N/A'}</TableCell>
                                        <TableCell>{JSON.parse(payment.productList)[0]?.count || 'N/A'}</TableCell>
                                        <TableCell>${JSON.parse(payment.productList)[0]?.finalPrice || 'N/A'}</TableCell>
                                        <TableCell>${(JSON.parse(payment.productList)[0]?.finalPrice * JSON.parse(payment.productList)[0]?.count) || 'N/A'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default UserPanel;
