import  { useEffect, useState } from 'react';
import { databases } from '../../appwrite'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import CourseCard from './../CourseCard/CourseCards';
import './CourseList.css';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await databases.listDocuments(
          '66bef5b0002aa8052fc4', 
          '66bef5ba002e0d84160f' 
        );
        setCourses(response.documents);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

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
      <h1 className='course-header'>popular courses</h1>
      
    <div className="courses-list">
      <Slider {...settings}>
        {courses.map(course => (
          <div key={course.$id}>
            <CourseCard
               id={course.$id}
              title={course.title}
              description={course.description}
              instructor={course.instructor}
              price={course.price}
              image={course.cover}
            />
          </div>
        ))}
      </Slider>
    </div>
    </div>
  );
};

export default CoursesList;