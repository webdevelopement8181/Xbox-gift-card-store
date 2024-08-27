import { useState, useEffect } from 'react';
import { databases } from '../../appwrite';
import { useNavigate, useParams } from 'react-router-dom';

const DocumentFormDetail = () => {
    const navigate = useNavigate();
    const { id: detailId } = useParams(); // Get the detailId from the route parameters
    const collectionId = '66c03a2e0015e930fa13'; // ID of the courseDetails collection

    const [formData, setFormData] = useState({
        detailedDescription: '',
        rating: '',  // Handle rating as a string
        language: '',
        demoVideo: '',
        courseId: '' // User will manually input this
    });

    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDocument = async () => {
            if (detailId) { // Only fetch if detailId is provided (indicating edit mode)
                try {
                    const response = await databases.getDocument('66bef5b0002aa8052fc4', collectionId, detailId);
                    setFormData({
                        detailedDescription: response.detailedDescription || '',
                        rating: response.rating || '', // Load rating as a string
                        language: response.language || '',
                        demoVideo: response.demoVideo || '',
                        courseId: response.courseId || '' // Load courseId from the document
                    });
                } catch (error) {
                    console.error('Error fetching document:', error);
                }
            }
        };
        fetchDocument();
    }, [collectionId, detailId]);

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

        if (!isValidURL(formData.demoVideo)) {
            setError('Demo Video must be a valid URL');
            return;
        }

        setError(''); // Clear any previous errors

        try {
            const dataToSubmit = {
                ...formData,
                rating: formData.rating,  // Ensure rating is treated as a string
            };

            if (detailId) {
                // Update existing detail
                await databases.updateDocument('66bef5b0002aa8052fc4', collectionId, detailId, dataToSubmit);
                navigate(`/admin/course-details`); // Redirect to the details list
            } else {
                console.error('Creating new details is not allowed.');
            }
        } catch (error) {
            console.error('Error saving document:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
            <div>
                <label>Course ID</label>
                <input
                    type="text"
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Detailed Description</label>
                <textarea
                    name="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            <div>
                <label>Rating</label>
                <input
                    type="text"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Language</label>
                <input type="text" name="language" value={formData.language} onChange={handleChange} required />
            </div>
            <div>
                <label>Demo Video</label>
                <input type="text" name="demoVideo" value={formData.demoVideo} onChange={handleChange} required />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default DocumentFormDetail;
