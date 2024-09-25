import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { databases } from '../../appwrite';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/css/DocumentForm.css'; 

const DocumentForm = ({ collectionName }) => {
    const navigate = useNavigate();
    const { id: documentId } = useParams(); // Get the documentId from the route parameters

    const collectionMapping = {
        onlineCourse: '66cde1ce003c4c7dfb11', 
    };

    const collectionId = collectionMapping[collectionName];

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: ''
    });

    const [error, setError] = useState('');

    // Fetch existing document if editing
    useEffect(() => {
        const fetchDocument = async () => {
            if (documentId) { // Only fetch if documentId is provided (indicating edit mode)
                try {
                    const response = await databases.getDocument('66cde1b70007c60cbc12', collectionId, documentId);
                    setFormData({
                        title: response.title || '',
                        description: response.description || '',
                        price: response.price || '',
                       image: response.image || ''
                    });
                } catch (error) {
                    console.error('Error fetching document:', error);
                }
            }
        };
        fetchDocument();
    }, [collectionId, documentId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const isValidURL = (value) => {
        try {
            new URL(value);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidURL(formData.image)) {
            setError('Cover must be a valid URL');
            return;
        }

        setError(''); // Clear any previous errors

        try {
            const dataToSubmit = {
                ...formData,
                price: formData.price ? parseFloat(formData.price) : 0,  // Ensure price is a float
            };

            if (documentId) {
                // Update existing document
                await databases.updateDocument('66cde1b70007c60cbc12', collectionId, documentId, dataToSubmit);
            } else {
                // Create new document
                await databases.createDocument('66cde1b70007c60cbc12', collectionId, 'unique()', dataToSubmit);
            }
            // Redirect to the corresponding list view
            navigate('/admin/courses');
        } catch (error) {
            console.error('Error saving document:', error);
        }
    };
    return (
        <div className="form-container">
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        step="0.01"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

DocumentForm.propTypes = {
    collectionName: PropTypes.string.isRequired, // collectionName must be a string and is required
};

export default DocumentForm;
