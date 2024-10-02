import React, { useEffect, useState } from 'react';
import { fetchPendingPayments, updatePaymentStatus } from '../../../appwrite'; 
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Typography, 
  CircularProgress, 
  Alert, 
  Box 
} from '@mui/material';

const TransactionReview = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const fetchedTransactions = await fetchPendingPayments();
        setTransactions(fetchedTransactions);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch transactions.');
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  const handleUpdateStatus = async (transactionId, userId, status) => {
    try {
      await updatePaymentStatus(transactionId, userId, status);
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
    <Box sx={{ width: '100%', p: { xs: 2, md: 4 }, maxWidth: { xs: '100%', md: '80%' }, margin: 'auto' }}>
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        align="center" 
        sx={{ marginBottom: "40px", fontSize: { xs: '1.5rem', md: '2rem' } }}
      >
        Admin Panel: Transactions
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {loading ? (
        <Box sx={{ textAlign: 'center', padding: '20px' }}>
          <CircularProgress />
        </Box>
      ) : transactions.length === 0 ? (
        <Typography variant="body1" align="center">No transactions found.</Typography>
      ) : (
        <TableContainer 
          component={Paper} 
          sx={{ 
            maxWidth: {xs: '80%', md: '90%' ,lg:'100%'  }, 
            margin: 'auto', 
            marginTop: 2, 
            overflowX: 'auto' // Ensure horizontal scroll on smaller screens
          }}
        >
          <Table sx= {{ width:{ xs: '80%', md: '90%' ,lg:'100%'  },
        marginLeft:{ xs: '35px', md: '25px' ,lg:'10px' }}}>
            <TableHead>
            <TableRow>
                <TableCell sx={{ width: {xs:'10%' , md:'15%'}, fontSize: { xs: '0.8rem', md: '1rem' }, padding: { xs: 1, md: 2 } }}>Name</TableCell>
                <TableCell sx={{ width: {xs:'10%' , md:'15%'}, fontSize: { xs: '0.8rem', md: '1rem' }, padding: { xs: 1, md: 2 } }}>Family Name</TableCell>
                <TableCell sx={{ width: {xs:'10%' , md:'15%'}, fontSize: { xs: '0.8rem', md: '1rem' }, padding: { xs: 1, md: 2 } }}>Email</TableCell>
                <TableCell sx={{ width: {xs:'10%' , md:'15%'}, fontSize: { xs: '0.8rem', md: '1rem' }, padding: { xs: 1, md: 2 } }}>Phone</TableCell>
                <TableCell sx={{  width: {xs:'10%' , md:'15%'}, fontSize: { xs: '0.8rem', md: '1rem' }, padding: { xs: 1, md: 2 } }}>Payment Status</TableCell>
                <TableCell align="center" sx={{ width: '15%', fontSize: { xs: '0.8rem', md: '1rem' }, padding: { xs: 1, md: 2 } }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.$id}>
                   <TableCell sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}>{transaction.Name}</TableCell>
                  <TableCell sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}>{transaction.FamilyName}</TableCell>
                  <TableCell sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}>{transaction.Email}</TableCell>
                  <TableCell sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}>{transaction.Phone}</TableCell>
                  <TableCell sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}>{transaction.PaymentStatus}</TableCell>
                  <TableCell align="center">
                    {transaction.PaymentStatus === 'pending' && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleUpdateStatus(transaction.$id, transaction.user_id, 'success')}
                          sx={{ 
                           
                            fontSize: { xs: '0.55rem', md: '0.675rem' }, 
                            padding: { xs: '2px 6px', md: '4px 10px' } ,
                            width: { xs: '110%' , md: '100%', lg:'95%' },
                            marginBottom: { xs: '10px' , md:'20px' },
                          }}
                        >
                          Mark as Success
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleUpdateStatus(transaction.$id, transaction.user_id, 'failure')}
                          sx={{ 
                            fontSize: { xs: '0.55rem', md: '0.675rem' }, 
                            padding: { xs: '2px 6px', md: '4px 10px' } ,
                            width: { xs: '110%' , md: '100%', lg:'95%' },
                            color: { xs: 'blue' , md: 'gray' },
                          }}
                        >
                          Mark as Failure
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TransactionReview;
