import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { databases } from '../../appwrite'; // Make sure to import your appwrite instance correctly

const CourseListDetail = () => {
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();

    const collectionId = '66c03a2e0015e930fa13'; // ID of the courseDetails collection

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await databases.listDocuments('66bef5b0002aa8052fc4', collectionId);
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
            await databases.deleteDocument('66bef5b0002aa8052fc4', collectionId, id);
            setDetails(details.filter((detail) => detail.$id !== id));
        } catch (error) {
            console.error('Error deleting detail:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/course-details/edit/${id}`);
    };

    return (
        <Container>
            <Paper elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Detailed Description</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Language</TableCell>
                            <TableCell>Demo Video</TableCell>
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
                                    <TableCell>{detail.demoVideo}</TableCell>
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
            </Paper>
        </Container>
    );
};

export default CourseListDetail;
