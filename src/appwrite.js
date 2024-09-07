import { Client, Account, Databases, OAuthProvider, Query, ID } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite API endpoint
    .setProject('66c9f3e7000496e06b42'); // Appwrite project ID

const account = new Account(client);
const databases = new Databases(client);

// Add limit and offset as parameters to the function for pagination
export const fetchProducts = async (minPrice, maxPrice, Category, newest = false, limit = 10, offset = 0) => {
  try {
    const queries = [
      Query.greaterThanEqual('price', minPrice),  // Filter products with price >= minPrice
      Query.lessThanEqual('price', maxPrice),     // Filter products with price <= maxPrice
      Query.limit(limit),                         // Pagination: limit the number of products per page
      Query.offset(offset)                        // Pagination: skip the first 'offset' products
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

export { account, databases, OAuthProvider, Query, ID };
