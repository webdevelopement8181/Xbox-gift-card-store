import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, TableContainer } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { databases } from '../../appwrite';

const ProductListDetail = () => {
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();

    const collectionId = '66cde5d000045bfa07ae'; // ID of the ProductDetails collection

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await databases.listDocuments('66cde1b70007c60cbc12', collectionId);
                console.log('Fetched details:', response.documents); // Debugging output
                setDetails(response.documents);
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };

        fetchDetails();
    }, []);

    const handleDelete = async (id) => {
        try {
            await databases.deleteDocument('66cde1b70007c60cbc12', collectionId, id);
            setDetails(details.filter((detail) => detail.$id !== id));
        } catch (error) {
            console.error('Error deleting detail:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/Product-details/edit/${id}`);
    };

    return (
        <Container 
          maxWidth="xl" 
          sx={{ 
            marginTop: '20px',
            marginLeft: { 
                xl: '100px',  // Large screens (1920px)
                lg: '80px',   // Medium-large screens
                md: '60px',   // Medium screens
                sm: '40px',   // Small screens
                xs: '20px'    // Extra small screens (phones)
            },
            width: {
                xl: '1600px', // Full-width for 1920px screens
                lg: '1200px', // Slightly smaller for large desktops
                md: '1000px', // Medium desktops
                sm: '800px',  // Tablets
                xs: '100%'    // Full-width for phones
            } 
          }}>
            <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Detailed Description</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Language</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {details.length > 0 ? (
                                details.map((detail) => (
                                    <TableRow key={detail.$id}>
                                        <TableCell>{detail.$id}</TableCell>
                                        <TableCell>{detail.detailedDescription}</TableCell>
                                        <TableCell>{detail.rating}</TableCell>
                                        <TableCell>{detail.language}</TableCell>
                                        <TableCell>
                                            <IconButton color="primary" onClick={() => handleEdit(detail.$id)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="secondary" onClick={() => handleDelete(detail.$id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No details found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default ProductListDetail;
