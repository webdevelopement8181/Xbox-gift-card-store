import React, { useEffect, useState } from "react";
import { account } from "../../appwrite"; 
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Material UI components
import { TextField, Button, Grid, Container, Typography, Box } from '@mui/material';

const AuthForm = React.memo(({ name, email, password, setName, setEmail, setPassword, handleLogin, handleSignUp }) => {
    return (
        <Box>
            <Typography variant="h4" align="center">Login / Sign Up</Typography>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth variant="outlined" onClick={handleSignUp}>
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
});

const Login = ({ setIsAuthenticated, setUserInfo }) => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const debouncedSetName = useDebouncedCallback((value) => setName(value), 50);
    const debouncedSetEmail = useDebouncedCallback((value) => setEmail(value), 50);
    const debouncedSetPassword = useDebouncedCallback((value) => setPassword(value), 50);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const accountUser = await account.get();
                setUser(accountUser);
                setUserInfo(accountUser);
                navigate("/");
            } catch (error) {
                setUser(null);
            }
        };
        checkUser();
    }, [navigate, setUserInfo]);

    const handleLogin = async () => {
        try {
            await account.createEmailPasswordSession(email, password);
            setIsAuthenticated(true);
            const accountUser = await account.get();
            setUser(accountUser);
            setUserInfo(accountUser);
            navigate(accountUser?.labels?.includes('admin') ? "/admin" : "/");
        } catch (error) {
            toast.error("Invalid login credentials. Please try again.");
        }
    };

    const handleSignUp = async () => {
        try {
            await account.create("unique()", email, password, name);
            handleLogin();
        } catch (error) {
            if (error.code === 409) {
                toast.error("Email already exists. Please use a different email.");
            } else {
                toast.error("Error signing up. Please try again.");
            }
        }
    };

    // Set background color for the body
    useEffect(() => {
      
        const originalBackgroundColor = document.body.style.backgroundColor;
        
        // Set the new background color
        document.body.style.backgroundColor = "#f0f4f7"; 
        
        // Cleanup: Revert to the original background color when the component unmounts
        return () => {
            document.body.style.backgroundColor = originalBackgroundColor;
        };
    }, []); // Empty dependency array to run only once on mount

    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ToastContainer />
            <Box mt={5} p={3} boxShadow={3} borderRadius={2} sx={{ backgroundColor: '#fff' }}>
                {user ? (
                    <Typography variant="body1" align="center">Redirecting...</Typography>
                ) : (
                    <AuthForm
                        name={name}
                        email={email}
                        password={password}
                        setName={debouncedSetName}
                        setEmail={debouncedSetEmail}
                        setPassword={debouncedSetPassword}
                        handleLogin={handleLogin}
                        handleSignUp={handleSignUp}
                    />
                )}
                <Typography
                    variant="body2"
                    align="center"
                    onClick={() => navigate('/')}
                    style={{ marginTop: '20px', cursor: 'pointer', color: 'blue' }}
                >
                    Click here if you don't want to sign in/login
                </Typography>
            </Box>
        </Container>
    );
};

Login.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
    setUserInfo: PropTypes.func.isRequired,
};

export default Login;
