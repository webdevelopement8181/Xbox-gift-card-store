import { Client, Account, Databases, OAuthProvider, Query, ID, Functions } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite API endpoint
    .setProject('66c9f3e7000496e06b42'); // Appwrite project ID

const account = new Account(client);
const databases = new Databases(client);
const functions = new Functions(client); // Initialize Functions for serverless execution

// Add limit and offset as parameters to the function for pagination
export const fetchProducts = async (minPrice, maxPrice, Category, newest = false, limit = 10, offset = 0) => {
  try {
    const queries = [
      Query.greaterThanEqual('price', minPrice),  
      Query.lessThanEqual('price', maxPrice),     
      Query.limit(limit),                         
      Query.offset(offset)                        
    ];

    if (Category) {
      queries.push(Query.equal('Category', Category));  // Filter by selected category
    }

    // If 'newest' is true, sort by creation date in descending order
    if (newest) {
      queries.push(Query.orderDesc('$createdAt'));
    }

    const response = await databases.listDocuments(
      '66cde1b70007c60cbc12', // Database ID
      '66cde1ce003c4c7dfb11', // Collection ID
      queries
    );

    return response.documents;
  } catch (error) {
    console.error('Error fetching products by price, category, and date:', error);
    throw error;
  }
};


export const fetchFunctionData = async (code, price) => {
  try {
    // Pass both the discount code and the total price from the cart
    const response = await functions.createExecution('66df1f8400179e0d7260', JSON.stringify({ code, price }));

    const responseBody = JSON.parse(response.responseBody);
    console.log('Parsed Response Body: ', responseBody);
    return responseBody;
  } catch (err) {
    console.error('Error:', err.message || err);
    throw new Error('Failed to validate discount code.');
  }
};


export { account, databases, functions, OAuthProvider, Query, ID };
