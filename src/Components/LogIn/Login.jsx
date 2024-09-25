import React, { useState, useEffect } from "react";
import { account } from "../../appwrite"; // Adjust the import based on your setup
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import './Login.css'; 
import { useDebouncedCallback } from 'use-debounce';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Memoized form component to prevent unnecessary re-renders
const AuthForm = React.memo(({ name, email, password, setName, setEmail, setPassword, handleLogin, handleSignUp }) => {
    return (
        <div>
            <h2>Login / Sign Up</h2>
            <div className="input-section">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="auth-input"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                />
            </div>
            <div className="button-section">
                <button onClick={handleLogin} className="auth-button">Login</button>
                <button onClick={handleSignUp} className="auth-button">Sign Up</button>
            </div>
        </div>
    );
});

const Login = ({ setIsAuthenticated, setUserInfo }) => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState(""); // State to store the user's name
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Debounced state updates to reduce re-renders on each keystroke
    const debouncedSetName = useDebouncedCallback((value) => {
        setName(value);
    }, 50);
    
    const debouncedSetEmail = useDebouncedCallback((value) => {
        setEmail(value);
    }, 50);
    
    const debouncedSetPassword = useDebouncedCallback((value) => {
        setPassword(value);
    }, 50);

    // Only check for the user once on mount
    useEffect(() => {
        const checkUser = async () => {
            try {
                const accountUser = await account.get();
                setUser(accountUser);
                setUserInfo(accountUser);
                navigate("/"); // Redirect to home if logged in
            } catch (error) {
                console.log("User not authenticated", error);
                setUser(null); // No user logged in
            }
        };

        checkUser();
    }, []); // No dependencies needed

    const handleLogin = async () => {
        try {
            await account.createEmailPasswordSession(email, password);
            setIsAuthenticated(true);
            const accountUser = await account.get();
            setUser(accountUser);
            setUserInfo(accountUser);
            const isAdmin = accountUser?.labels?.includes('admin');
            if (isAdmin) {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (error) {
            toast.error("Invalid login credentials. Please try again."); // Show error as toast
        }
    };

    const handleSignUp = async () => {
        try {
            await account.create("unique()", email, password, name); // Pass the name to the account creation
            handleLogin(); // Automatically log in after signing up
        } catch (error) {
            // Suppress logging for specific errors
            if (error.code === 409) { // Check if error code is 409 for duplicate email
                toast.error("Email already exists. Please use a different email."); // Show toast message
            } else {
                toast.error("Error signing up. Please try again."); // General error handling
            }
        }
    };

    return (
        <div className="auth-container">
            <ToastContainer />
            <div className="auth-form">
                {user ? (
                    <div>Redirecting...</div>
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
                <div onClick={() => navigate('/')} className="redirect-message">
                    Click here if you don't want to sign in/login
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,  
    setUserInfo: PropTypes.func.isRequired,
};

export default Login;
