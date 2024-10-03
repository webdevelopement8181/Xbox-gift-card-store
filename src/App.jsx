import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import Login from './Components/LogIn/Login';
import Products from './Components/Products/Products';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Hero from './Components/HeroSection/Hero';
import ProductListDetails from './Components/ProductDetails/ProductListDetails';
import { account } from './appwrite';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import ChartDashboard from './Components/Dashboard/ChartDashboard';
import DashProductLis from './Components/Dashboard/DashProductLis';
import DocumentForm from './Components/Dashboard/DocumentForm'; 
import DashProductListDetail from './Components/Dashboard/DashProductListDetail';
import DocumentFormDetail from './Components/Dashboard/DocumentFormDetail';
import AdminRoute from './Components/Dashboard/AdminRoute';
import CartList from './Components/CartList/CartList';
import { CartProvider } from './Components/Context/CartContext';
import PaymentPage from './Components/PaymentPage/PaymentPage';
import TransactionReview from './Components/Dashboard/Transactions/TransactionReview';
import UserPanel from './Components/UserPanel/UserPanel';
import SearchResults from './Components/SearchBar/SearchResults/SearchResults';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accountSession = await account.get(); 
        setIsAuthenticated(true);
        setUserInfo(accountSession); 
      } catch (error) {
        setIsAuthenticated(false);
        setUserInfo(null); 
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current'); 
      setIsAuthenticated(false);
      alert("You have been logged out.");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <CartProvider>
      <Router>
        <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserInfo={setUserInfo}  />} />       
           <Route path="/Product/:id" element={<ProductListDetails />} />
          <Route path="/admin/*" element={<AdminRoute />}>
            <Route path="*" element={<AdminDashboard />}>
              <Route path="transaction" element={<TransactionReview collectionName="PaymentData" />} />
              <Route path="" element={<ChartDashboard />} />
              <Route path="products" element={<DashProductLis collectionName="productList" />} />
              <Route path="Product-details" element={<DashProductListDetail collectionName="productDetails" />} />
              <Route path="Product/create" element={<DocumentForm collectionName="productList" />} />
              <Route path="Product/edit/:id" element={<DocumentForm collectionName="productList" />} />
              <Route path="Product-details/edit/:id" element={<DocumentFormDetail />} />
            </Route>
          </Route>

          {/* Home Route with Navbar and Hero */}
          <Route 
            path="/" 
            element={
              <>
                <Navbar 
                  isAuthenticated={isAuthenticated} 
                  setIsAuthenticated={setIsAuthenticated} 
                  handleLogout={handleLogout} 
                />
                <Hero />
                <Home />
              </>
            } 
          />

          {/* Other Routes accessible without authentication */}
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<CartList isAuthenticated={isAuthenticated} />} />
          <Route path="/userpanel" element={<UserPanel user={userInfo}/>} />
          <Route path="/search" element={< SearchResults />} />


          {/* Protect the payment route */}
          <Route 
            path="/payment" 
            element={isAuthenticated ? <PaymentPage /> : <Navigate to="/login" />} 
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
