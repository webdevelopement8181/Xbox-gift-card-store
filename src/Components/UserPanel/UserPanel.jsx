// UserPanel.js
import React from 'react';
import PropTypes from 'prop-types';

const UserPanel = ({ user }) => {
    return (
        <div className="user-panel">
            <h2>User Information</h2>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name || "No name provided"}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>No user information available. Please log in.</p>
            )}
        </div>
    );
};

UserPanel.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string.isRequired,
    }),
};

export default UserPanel;
