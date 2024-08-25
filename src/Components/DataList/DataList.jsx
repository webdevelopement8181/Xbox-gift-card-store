// DataList.jsx
import { useEffect, useState } from 'react';
import { fetchData } from '../../appwrite'; // Import the fetchData function

function DataList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data using the function from appwrite.js
    fetchData()
      .then((responseBody) => {
        setData(responseBody);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Sample Data</h1>
      <ul>
        {Array.isArray(data) ? (
          data.map((item) => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </div>
  );
}

export default DataList;
