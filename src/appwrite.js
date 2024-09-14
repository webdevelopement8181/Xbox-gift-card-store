import { Client, Account, Databases, OAuthProvider, Query, ID, Functions } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite API endpoint
    .setProject('66c9f3e7000496e06b42'); // Appwrite project ID

const account = new Account(client);
const databases = new Databases(client);
const functions = new Functions(client); 

// Submit payment form data to Appwrite database
export const submitPayment = async (paymentData) => {
  try {
    const response = await databases.createDocument(
      '66cde1b70007c60cbc12', // Replace with your actual database ID
      '66e58e900005b8d41dda', // Replace with your actual collection ID
      ID.unique(), // Generate a unique document ID
      paymentData  // Payment form data (Name, FamilyName, Email, Phone, etc.)
    );
    console.log('Submit Payment Response:', response);  // Log the full response
    return response.$id;  // Return the document ID from the response
  } catch (error) {
    console.error('Error submitting payment:', error);
    throw error;
  }
};
// Fetch pending payments from the database (for admin panel)
export const fetchPendingPayments = async () => {
  try {
    const response = await databases.listDocuments(
      '66cde1b70007c60cbc12', // database ID
      '66e58e900005b8d41dda', //collection ID
      [Query.equal('PaymentStatus', 'pending')] 
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};
// Fetch the current payment status based on paymentId
export const fetchPaymentStatus = async (paymentId) => {
  try {
    const response = await databases.getDocument(
      '66cde1b70007c60cbc12',  // Replace with your database ID
      '66e58e900005b8d41dda',  // Replace with your collection ID
      paymentId // The document ID (paymentId)
    );
    return response.PaymentStatus;  // Return the payment status field
  } catch (error) {
    console.error('Error fetching payment status:', error);
    throw error;
  }
};


export const updatePaymentStatus = async (paymentId, status) => {
  try {
    const response = await databases.updateDocument(
      '66cde1b70007c60cbc12',  // Database ID
      '66e58e900005b8d41dda',  // Collection ID
      paymentId,  // The document ID
      { PaymentStatus: status }  // Update the PaymentStatus field
    );
    console.log('Update successful:', response);  // Debug log
    return response;
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};


// Example for fetching products (you can keep it)
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

// Example for fetching function data
export const fetchFunctionData = async (code, price) => {
  try {
    const response = await functions.createExecution('66df1f8400179e0d7260', JSON.stringify({ code, price }));
    const responseBody = JSON.parse(response.responseBody);
    console.log('Parsed Response Body: ', responseBody);
    return responseBody;
  } catch (err) {
    console.error('Error:', err.message || err);
    throw new Error('Failed to validate discount code.');
  }
};

// Export client, account, databases, etc.
export { account, databases, functions, OAuthProvider, Query, ID };
