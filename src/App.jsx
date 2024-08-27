import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import Login from './Components/LogIn/Login';
import Products from './Components/Products/Products';
import Hero from './Components/HeroSection/Hesro';
import CourseDetails from './Components/CourseDetails/CourseDetails';
import { account } from './appwrite';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import ChartDashboard from './Components/Dashboard/ChartDashboard';
import CourseList from './Components/Dashboard/CourseList';
import DocumentForm from './Components/Dashboard/DocumentForm'; 
import CourseListDetail from './Components/Dashboard/CreateListDetail';
import DocumentFormDetail from './Components/Dashboard/DocumentFormDetail';
import AdminRoute from './Components/Dashboard/AdminRoute'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('App component mounted');
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        const accountSession = await account.get(); // Try to fetch the current session
        console.log('Session found:', accountSession);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('No active session found, user is not authenticated:', error);
        setIsAuthenticated(false); // No active session, user is a guest
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current'); // End the current session
      setIsAuthenticated(false);
      alert("You have been logged out.");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />   
      <Route path="/course/:id" element={<CourseDetails />} />
           <Route 
          path="*" 
          element={
            <>
              <Navbar 
                isAuthenticated={isAuthenticated} 
                setIsAuthenticated={setIsAuthenticated} 
                handleLogout={handleLogout} 
              />
              <Hero />
              
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/login" />} />
              
              </Routes>
            </>
          } 
        />
<Route path="/admin/*" element={<AdminRoute />}>
      {/* AdminDashboard is the main layout for all admin routes */}
      <Route path="*" element={<AdminDashboard />}>
        {/* Nested routes within AdminDashboard */}
        <Route path="" element={<ChartDashboard />} />
        <Route path="courses" element={<CourseList collectionName="onlineCourse" />} />
        <Route path="course-details" element={<CourseListDetail collectionName="courseDetails" />} />
        <Route path="courses/create" element={<DocumentForm collectionName="onlineCourse" />} />
        <Route path="courses/edit/:id" element={<DocumentForm collectionName="onlineCourse" />} />
        <Route path="course-details/edit/:id" element={<DocumentFormDetail />} />
      </Route>
    </Route>
  </Routes>
</Router>
  );
}

export default App;