// appwrite.js
import { Client, Functions } from 'appwrite';

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('66c9f3e7000496e06b42'); // Replace with your project ID

const functions = new Functions(client);

export const fetchData = async () => {
  try {
    const response = await functions.createExecution('66cacfca0006939c7b5d');
    console.log('Response:', response.responseBody); // Log the raw response body
    const responseBody = JSON.parse(response.responseBody);
    console.log('Parsed Response Body:', responseBody); // Log the parsed response
    return responseBody;
  } catch (err) {
    console.error('Error:', err);
    throw new Error('Failed to load data.');
  }
};
