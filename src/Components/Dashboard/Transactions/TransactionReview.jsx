import React, { useEffect, useState } from 'react';
import { fetchPendingPayments, updatePaymentStatus } from '../../../appwrite';  // Import fetchTransactions from appwrite
import './TransactionReview.css';  // Import the CSS file

const TransactionReview = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  // Fetch transactions when component mounts
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const fetchedTransactions = await fetchPendingPayments();
        setTransactions(fetchedTransactions);
      } catch (error) {
        setError('Failed to fetch transactions.');
      }
    };

    getTransactions();
  }, []);

  // Update payment status (e.g., from pending to success or failure)
  const handleUpdateStatus = async (transactionId, status) => {
    try {
      await updatePaymentStatus(transactionId, status);  // Update the status in Appwrite
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.$id === transactionId
            ? { ...transaction, PaymentStatus: status }
            : transaction
        )
      );
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  return (
    <div className="admin-panel-container">
      <h1>Admin Panel: Transactions</h1>
      {error && <p>{error}</p>}
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Family Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.$id}>
                <td>{transaction.Name}</td>
                <td>{transaction.FamilyName}</td>
                <td>{transaction.Email}</td>
                <td>{transaction.Phone}</td>
                <td>{transaction.PaymentStatus}</td>
                <td>
                  {transaction.PaymentStatus === 'pending' && (
                    <>
                      <button onClick={() => handleUpdateStatus(transaction.$id, 'success')}>
                        Mark as Success
                      </button>
                      <button
                        className="failure-button"
                        onClick={() => handleUpdateStatus(transaction.$id, 'failure')}
                      >
                        Mark as Failure
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionReview;
