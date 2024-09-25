import { useEffect, useState } from 'react';
import '../../assets/css/DynamicStatistics.css';

import {
  BsFillArchiveFill,
  BsPeopleFill,
} from 'react-icons/bs';
import { databases,  } from '../../appwrite';

const DynamicStatistics = () => {
  const [onlineProductCount, setOnlineProductCount] = useState(0);
  

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // Fetch number of titles in onlineProduct collection
        const onlineProductResponse = await databases.listDocuments('66cde1b70007c60cbc12', '66cde1ce003c4c7dfb11');
        console.log('OnlineProduct Response:', onlineProductResponse);  // Debugging output
        setOnlineProductCount(onlineProductResponse.total);

        
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
            <h3>ONLINE ProductS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{onlineProductCount}</h1>
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
