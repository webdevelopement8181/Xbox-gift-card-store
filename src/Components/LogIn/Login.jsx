import React, { useState, useEffect } from "react";
import { account } from "../../appwrite"; // Adjust the import based on your setup
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import './Login.css'; 

const Login = ({ setIsAuthenticated }) => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState(""); // State to store the user's name
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to store error messages
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    useEffect(() => {
        const checkUser = async () => {
            try {
                const accountUser = await account.get();
                setUser(accountUser);
                navigate("/"); // Redirect to home if logged in
            } catch (error) {
                console.log("User not authenticated", error);
                setUser(null); // No user logged in
            }
        };

        checkUser();
    }, [navigate]);

    const handleLogin = async () => {
        try {
            await account.createEmailPasswordSession(email, password);
            setIsAuthenticated(true);

            // Fetch the logged-in user details
            const accountUser = await account.get();
            setUser(accountUser);

            // Check if the user has the admin label/role
            const isAdmin = accountUser?.labels?.includes('admin'); // Assuming 'labels' field in the user object
            if (isAdmin) {
                navigate("/admin"); // Redirect to admin page if user is an admin
            } else {
                navigate("/"); // Redirect to home page if not an admin
            }

        } catch (error) {
            console.log(error);
            setError("Invalid login credentials. Please try again."); // Set error message
        }
    };

    const handleSignUp = async () => {
        try {
            await account.create("unique()", email, password, name); // Pass the name to the account creation
            handleLogin(); // Automatically log in after signing up
        } catch (error) {
            console.log(error);
            setError("Error signing up. Please try again."); // Set error message
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                {user ? (
                    <div>Redirecting...</div>
                ) : (
                    <div>
                        <h2>Login / Sign Up</h2>
                        {error && <p className="error-message">{error}</p>}
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
                )}
                <div onClick={handleRedirect}  className="redirect-message">
                  click here if you dot want to sign in/login
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,  // setIsAuthenticated must be a function and is required
};

export default Login;
