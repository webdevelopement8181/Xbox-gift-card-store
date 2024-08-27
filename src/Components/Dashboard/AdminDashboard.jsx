import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText, Drawer } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import ChartDashboard from'./ChartDashboard';

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation(); // This gives us the current path

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <Drawer
                    variant="permanent"
                    open={open}
                    onMouseOver={handleDrawerOpen}
                    onMouseLeave={handleDrawerClose}
                    PaperProps={{
                        style: {
                            width: open ? '250px' : '60px',
                            transition: 'width 0.3s',
                            overflowX: 'hidden',
                            backgroundColor: '#301E67',
                            color: '#fff',
                        },
                    }}
                >
                    <List>
                        <ListItem button component={Link} to="/admin">
                            <HomeIcon style={{ color: '#fff', marginBottom: '20px', marginRight: open ? '20px' : '0' }} />
                            {open && <ListItemText primary="Home" />}
                        </ListItem>
                        <ListItem button component={Link} to="/admin/courses">
                            <StoreIcon style={{ color: '#fff', marginBottom: '20px', marginRight: open ? '20px' : '0' }} />
                            {open && <ListItemText primary="Manage Courses" />}
                        </ListItem>
                        <ListItem button component={Link} to="/admin/course-details">
                            <PeopleIcon style={{ color: '#fff', marginBottom: '20px', marginRight: open ? '20px' : '0' }} />
                            {open && <ListItemText primary="Manage Course Details" />}
                        </ListItem>
                    </List>
                </Drawer>
                </div>
                <div>
                    {location.pathname === '/admin' ? <ChartDashboard /> : <Outlet />}
                    {/* Renders ChartDashboard only on /admin, otherwise renders the Outlet content */}
                    </div>
            
        </div>
    );
};

export default AdminDashboard;
