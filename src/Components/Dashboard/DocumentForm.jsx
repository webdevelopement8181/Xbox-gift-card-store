import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { databases } from '../../appwrite';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/DocumentForm.css'; // Import the CSS file

const DocumentForm = ({ collectionName }) => {
    const navigate = useNavigate();
    const { id: documentId } = useParams(); // Get the documentId from the route parameters

    const collectionMapping = {
        onlineCourse: '66bef5ba002e0d84160f', // Replace with actual ID
    };

    const collectionId = collectionMapping[collectionName];

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        instructor: '',
        cover: ''
    });

    const [error, setError] = useState('');

    // Fetch existing document if editing
    useEffect(() => {
        const fetchDocument = async () => {
            if (documentId) { // Only fetch if documentId is provided (indicating edit mode)
                try {
                    const response = await databases.getDocument('66bef5b0002aa8052fc4', collectionId, documentId);
                    setFormData({
                        title: response.title || '',
                        description: response.description || '',
                        price: response.price || '',
                        instructor: response.instructor || '',
                        cover: response.cover || ''
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

        if (!isValidURL(formData.cover)) {
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
                await databases.updateDocument('66bef5b0002aa8052fc4', collectionId, documentId, dataToSubmit);
            } else {
                // Create new document
                await databases.createDocument('66bef5b0002aa8052fc4', collectionId, 'unique()', dataToSubmit);
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
                    <label>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            
                </div>
                <div>
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
                  
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
                  
                </div>
                <div>
                    <label>Instructor</label>
                    <input type="text" name="instructor" value={formData.instructor} onChange={handleChange} required />
                 
                </div>
                <div>
                    <label>Cover</label>
                    <input type="text" name="cover" value={formData.cover} onChange={handleChange} required />
                 44444444444
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
