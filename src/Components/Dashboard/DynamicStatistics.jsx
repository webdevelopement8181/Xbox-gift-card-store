import { useEffect, useState } from 'react';
import '../../assets/DynamicStatistics.css';

import {
  BsFillArchiveFill,
  BsPeopleFill,
} from 'react-icons/bs';
import { databases,  } from '../../appwrite';

const DynamicStatistics = () => {
  const [onlineCourseCount, setOnlineCourseCount] = useState(0);
  

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // Fetch number of titles in onlineCourse collection
        const onlineCourseResponse = await databases.listDocuments('66bef5b0002aa8052fc4', '66bef5ba002e0d84160f');
        console.log('OnlineCourse Response:', onlineCourseResponse);  // Debugging output
        setOnlineCourseCount(onlineCourseResponse.total);

        
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div>
       
        <div className='container'>
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card" style={{ backgroundColor: '#AA77FF' }}>
          <div className="card-inner">
            <h3>ONLINE COURSES</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{onlineCourseCount}</h1>
        </div>

        <div className="card" style={{ backgroundColor: '#5A639C' }}>
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>15</h1>
        </div>
        
        <div className="card" style={{ backgroundColor: '#5A639C' }}>
          <div className="card-inner">
            <h3>alerts</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>25</h1>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DynamicStatistics;
