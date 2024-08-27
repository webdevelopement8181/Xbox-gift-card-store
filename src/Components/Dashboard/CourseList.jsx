
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { databases } from '../../appwrite';

const OnlineCourseList = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await databases.listDocuments('66bef5b0002aa8052fc4', '66bef5ba002e0d84160f');
        setCourses(response.documents);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await databases.deleteDocument('66bef5b0002aa8052fc4', '66bef5ba002e0d84160f', id);
      setCourses(courses.filter((course) => course.$id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/courses/edit/${id}`);
  };

  const handleCreate = () => {
    navigate('/admin/courses/create');
  };

  return (
    <Container>
      <Paper elevation={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleCreate}
          style={{ margin: '20px' }}
        >
          Create
        </Button>
        <Table>
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
                  <IconButton color="primary" onClick={() => handleEdit(course.$id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(course.$id)}>
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

export default OnlineCourseList;

