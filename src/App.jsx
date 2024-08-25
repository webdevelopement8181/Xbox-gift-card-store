import { useEffect, useState } from 'react';
import { Client, Functions } from 'appwrite';

function App() {
  // const [message, setMessage] = useState('Loading...');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    // Initialize Appwrite client
    const client = new Client();
    client
      .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
      .setProject('66c9f3e7000496e06b42'); // Replace with your project ID

    const functions = new Functions(client);

    functions.createExecution('66cacfca0006939c7b5d')
    .then(response => {
      console.log('Response:', response.responseBody); // Log the raw response body
      const responseBody = JSON.parse(response.responseBody);
      console.log('Parsed Response Body:', responseBody); // Log the parsed response
      setData(responseBody);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error:', err);
      setError('Failed to load data.');
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
        data.map(item => (
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

export default App;