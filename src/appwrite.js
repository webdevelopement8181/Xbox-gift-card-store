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
      '66e58e900005b8d41dda',  // Collection ID
      [Query.equal('PaymentStatus', 'pending')]  // Filter by pending status
    );
    return response.documents;  // Return pending transactions
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

// Update the payment status with both transactionId and userId
export const updatePaymentStatus = async (transactionId, userId, status) => {
  try {
    const response = await databases.updateDocument(
      '66cde1b70007c60cbc12',  // Database ID
      '66e58e900005b8d41dda',   // Replace with your collection ID
      transactionId,  // The transaction (payment) ID
      {
        PaymentStatus: status,  // The new status to set
      }
    );

    // Ensure the payment belongs to the userId
    if (response.user_id !== userId) {
      throw new Error('Unauthorized: Cannot update payment for another user.');
    }

    console.log('Update successful:', response);
    return response;
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};

// Fetch products (example function you can keep)
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

// Fetch function data (optional, depending on your use case)
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

// Fetch payments associated with a specific userId
export const getUserPayments = async (userId) => {
  try {
    const response = await databases.listDocuments(
      '66cde1b70007c60cbc12',            // Replace with your actual database ID
      '66e58e900005b8d41dda',            // Replace with your actual collection ID for payments
      [Query.equal('user_id', userId)]    // Query by userId to get all payments related to the user
    );
    return response.documents;            // Return the array of payments
  } catch (error) {
    console.error('Error fetching user payments:', error);
    throw error;
  }
};

// Function to update the user's name and email
// Function to update the user's name and email, including password for email update
// Function to update the user's name and email, including password for email update
// Function to update the user's name, email, and password
export const updateUser = async (email, name, newPassword, currentPassword) => {
  try {
    const currentUser = await account.get();

    if (email !== currentUser.email) {
      // Update email (requires the current password)
      await account.updateEmail(email, currentPassword);
    }

    if (name !== currentUser.name) {
      // Update name if it's different
      await account.updateName(name);
    }

    if (newPassword) {
      // Update password if provided
      await account.updatePassword(newPassword, currentPassword);
    }

    return { success: true };
  } catch (error) {
    if (error.message.includes('A target with the same ID already exists')) {
      throw new Error('Email is already in use by another account.');
    } else {
      console.error('Error updating user:', error);
      throw error;
    }
  }
};



// Export client, account, databases, etc.
export { account, databases, functions, OAuthProvider, Query, ID };
