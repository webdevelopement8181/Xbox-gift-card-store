import  React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { account } from "../../appwrite"; // Adjust the import based on your setup
// import AdminDashboard from '../Dashboard/AdminDashboard'; // Import the AdminDashboard component

const AdminRoute = () => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const user = await account.get();
                if (user?.labels?.includes('admin')) { // Assuming 'labels' field in the user object
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                setIsAdmin(false);
            }
            setLoading(false);
        };

        checkAdmin();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAdmin ? (
        <>
            {/* <AdminDashboard />  This will render the AdminDashboard on all admin routes */}
            <Outlet />          {/* This will render the specific content for each admin route */}
        </>
    ) : (
        <Navigate to="/" />
    );
};

export default AdminRoute;