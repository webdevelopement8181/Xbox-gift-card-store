import React, { useEffect, useState } from 'react';
import { databases, Query } from '../../appwrite'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import CourseCards from '../CourseCard/CourseCards';
import './CourseList.css';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [hasError, setHasError] = useState(false); // error state

  useEffect(() => {
    // Add this line
    const fetchCourses = async () => {
      console.log('useEffect triggered'); 
      try {
        const response = await databases.listDocuments(
          '66cde1b70007c60cbc12', 
          '66cde1ce003c4c7dfb11',
          [
            Query.equal('IsPopular', true) // Filter to only include popular courses
          ]
        );
        setCourses(response.documents);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setHasError(true); 
        // Set error state if fetch fails
      }
    };

    fetchCourses();
  }, []);

  if (hasError) {
    return <div>Error fetching courses.</div>; 
  }
   
   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <div>
      <h1 className='course-header'>Popular Courses</h1>
      <div className="courses-list">
        <Slider {...settings}>
          {courses.map(course => (
            <div key={course.$id}>
              <CourseCards
                id={course.$id}
                title={course.title}
                description={course.description}
                price={course.price}
                image={course.image}
                inSale={course.inSale}  // Pass isInSale
                discountPercentage={course.discountPercentage}  // Pass discountPercentage
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};


export default CoursesList;