import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { databases, Query } from '../../appwrite';
import './CourseDetails.css';
import { FaDollarSign, FaStar, FaLanguage,  FaSignInAlt, FaVideo, FaDesktop, FaInfinity, FaCertificate, FaCheckCircle } from 'react-icons/fa';
const CourseDetail = () => {
    const { id } = useParams(); // Get the course ID from the URL parameters
    const [course, setCourse] = useState(null);
    const [courseDetails, setCourseDetails] = useState(null); // State for additional course details

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                console.log("Fetching course data..."); // Debugging
                const courseResponse = await databases.getDocument('66cde1b70007c60cbc12', "66cde1ce003c4c7dfb11", id);
                console.log("Course data fetched", courseResponse); // Debugging
                setCourse(courseResponse);
    
                const courseDetailsResponse = await databases.listDocuments(
                    '66cde1b70007c60cbc12',
                    '66cde5d000045bfa07ae',
                    [Query.equal('coursrId', id)]
                );
                console.log("Course details fetched", courseDetailsResponse); // Debugging
                if (courseDetailsResponse.documents.length > 0) {
                    setCourseDetails(courseDetailsResponse.documents[0]);
                }
            } catch (error) {
                console.error('Error fetching course data:', error);
                setHasError(true);  // Update the error state
            }
            
        };
    
        fetchCourseData();
    }, [id]);
    
    
    if (hasError) {
        return <div>Error loading course details. Please try again later.</div>;
    }

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="course-detail">
            <div className="course-detail-header">
                <div className="course-info">
                    {course && (
                        <>
                            <h1>{course.title}</h1>
                            <p>{course.description}</p>
                            <p><FaDollarSign /> Price: ${course.price}</p>
                        </>
                    )}
                </div>
                {course?.image && <img src={course.image} alt={course.title} className="course-images" />}
            </div>
    
            {courseDetails && (
                <div className="course-details-section">
                    <h2>About This Course</h2>
                    <p>{courseDetails.detailedDescription}</p>
    
                    <h3>What You Will Learn</h3>
                    <ul>
                        {courseDetails.learningPoints && courseDetails.learningPoints.map((point, index) => (
                            <li key={index}><FaCheckCircle /> {point}</li>
                        ))}
                    </ul>
    
                    <h3><FaStar /> Rating</h3>
                    <p>{courseDetails.rating} / 5</p>
    
                    <h3><FaLanguage /> Language</h3>
                    <p>{courseDetails.language}</p>
    
                    <div className="cta-section">
                        <button className="join-course-btn"><FaSignInAlt /> Join Course</button>
                        <div className="course-includes">
                            <h4><FaVideo /> This Course Includes</h4>
                            <ul>
                                <li><FaVideo /> {courseDetails.videoLessons} Video Lessons</li>
                                <li><FaDesktop /> Access on desktop, tablet, and mobile</li>
                                <li><FaInfinity /> Full Lifetime Access</li>
                                <li><FaCertificate /> Certificate of Completion</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}    

export default CourseDetail;
