import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { databases, Query } from '../../appwrite';
import './CourseDetails.css';
import { FaChalkboardTeacher, FaClock, FaDollarSign, FaStar, FaLanguage, FaPlayCircle, FaSignInAlt, FaVideo, FaDesktop, FaInfinity, FaCertificate, FaCheckCircle } from 'react-icons/fa';

const CourseDetail = () => {
    const { id } = useParams(); // Get the course ID from the URL parameters
    const [course, setCourse] = useState(null);
    const [courseDetails, setCourseDetails] = useState(null); // State for additional course details

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                // Fetch the main course data from the onlineCourse collection
                const courseResponse = await databases.getDocument(
                    '66bef5b0002aa8052fc4',
                    '66bef5ba002e0d84160f',
                    id // The course ID from the URL
                );
                setCourse(courseResponse);

                // Fetch the additional course details from the courseDetails collection
                const courseDetailsResponse = await databases.listDocuments(
                    '66bef5b0002aa8052fc4',
                    '66c03a2e0015e930fa13',
                    [Query.equal('courseId', id)]
                );

                if (courseDetailsResponse.documents.length > 0) {
                    setCourseDetails(courseDetailsResponse.documents[0]);
                }
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        fetchCourseData();
    }, [id]);

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="course-detail">
            <div className="course-detail-header">
                <div className="course-info">
                    <h1>{course.title}</h1>
                    <p>{course.description}</p>
                    <p><FaChalkboardTeacher /> Instructor: {course.instructor}</p>
                    <p><FaClock /> Duration: {course.duration} hours</p>
                    <p><FaDollarSign /> Price: ${course.price}</p>
                </div>
                {course.cover && <img src={course.cover} alt={course.title} className="course-images" />}
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

                    {courseDetails.demoVideo && (
                        <div className="course-video">
                            <h3><FaPlayCircle /> Demo Video</h3>
                            <video controls>
                                <source src={courseDetails.demoVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}

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
};

export default CourseDetail;
