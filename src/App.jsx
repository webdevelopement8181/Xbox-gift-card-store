import { useEffect, useState } from 'react';
import { Client, Functions } from 'appwrite';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    // Initialize Appwrite client
    const client = new Client();
    client
      .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
      .setProject('66c9f3e7000496e06b42'); // Replace with your project ID

    const functions = new Functions(client);

    // Call the function
    functions.createExecution('66cacfca0006939c7b5d','', 'GET')
    .then(response => {
      console.log('Response:', response); // Log the entire response to the console
      
      // Parse the JSON response body
      const responseBody = JSON.parse(response.responseBody);
      
      // You can now access properties like `motto` from the parsed object
      setMessage(responseBody.motto); // Update the state with a specific value from the response
    })
    .catch(error => {
      console.error('Error:', error);
      setMessage('Failed to load message.');
    });
}, []);
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
