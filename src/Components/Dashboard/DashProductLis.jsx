import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  IconButton, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Paper, 
  Container, 
  Grid, 
  useMediaQuery 
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { databases } from '../../appwrite';
import { useTheme } from '@mui/material/styles';

const ProductList = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await databases.listDocuments('66cde1b70007c60cbc12' ,'66cde1ce003c4c7dfb11');
        setCourses(response.documents);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await databases.deleteDocument('66cde1b70007c60cbc12', '66cde1ce003c4c7dfb11', id);
      setCourses(courses.filter((course) => course.$id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/Product/edit/${id}`);
  };

  const handleCreate = () => {
    navigate('/admin/Product/create');
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: '20px' ,    marginLeft:{ 
      xl:'180px',
      lg:'120px',
      md:'110px',
      sm:'200px',
      xs:'80px'}, }}>
      <Paper elevation={3} sx={{ padding: '20px', overflowX: 'auto' }}>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleCreate}
              sx={{
             
                marginLeft:'30px',
                fontSize: {
                  xs: '12px',
                  sm: '14px',
                  md: '16px',
                  lg: '16px',
                },
                width:{
                  xs: '120px',
                  sm: '180px',
                  md: '160px',
                  lg: '230px',
                  // xl:'400px'
                },
                padding: {
                  xs: '10px 5px',
                  sm: '12px 8px',
                  lg: '14px 10px',
                },
              }}
            >
              Create
            </Button>
          </Grid>
        </Grid>
        <Table sx={{ minWidth: '300px', marginTop: '20px', marginLeft:'30px',   width: {
                  xl:'100%',
                  lg:'90%',
                  md:'80%',
                  sm:'70%',
                  xs:'60%'
                }, }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.$id}>
                <TableCell>{course.$id}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(course.$id)}
                    sx={{
                      fontSize: {
                        xs: '16px',
                        sm: '18px',
                        lg: '20px',
                      },
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(course.$id)}
                    sx={{
                      fontSize: {
                        xs: '16px',
                        sm: '18px',
                        lg: '20px',
                      },
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default ProductList;
