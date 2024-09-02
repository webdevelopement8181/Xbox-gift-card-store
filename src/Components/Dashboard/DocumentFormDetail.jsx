import React ,{ useState, useEffect } from 'react';
import { databases } from '../../appwrite';
import { useNavigate, useParams } from 'react-router-dom';

const DocumentFormDetail = () => {
    const navigate = useNavigate();
    const { id: detailId } = useParams(); 
    const collectionId = '66cde5d000045bfa07ae'; // ID of the courseDetails collection

    const [formData, setFormData] = useState({
        detailedDescription: '',
        rating: '',  
        language: '',
        coursrId: '' 
    });

    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDocument = async () => {
            if (detailId) { // Only fetch if detailId is provided (indicating edit mode)
                try {
                    const response = await databases.getDocument('66cde1b70007c60cbc12', collectionId, detailId);
                    setFormData({
                        detailedDescription: response.detailedDescription || '',
                        rating: response.rating || '',
                        language: response.language || '',
                        
                        coursrId: response.coursrId || ''
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
                await databases.updateDocument('66cde1b70007c60cbc12', collectionId, detailId, dataToSubmit);
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
                <label htmlFor="coursrId">Course ID</label>
                <input
                    type="text"
                    id="coursrId"
                    name="coursrId"
                    value={formData.coursrId}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="detailedDescription">Detailed Description</label>
                <textarea
                    id="detailedDescription"
                    name="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            <div>
                <label htmlFor="rating">Rating</label>
                <input
                    type="text"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="language">Language</label>
                <input
                    type="text"
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    required
                />
            </div>
           
            <button type="submit">Save</button>
        </form>
    );
};

export default DocumentFormDetail;
