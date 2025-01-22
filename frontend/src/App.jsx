import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Shop from "./Pages/Shop.jsx";
import ShopCategory from "./Pages/ShopCategory.jsx";
import Product from "./Pages/Product.jsx";
import Cart from "./Pages/Cart.jsx";
import NoPage from "./Pages/NoPage.jsx";
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import banner_mens from './Components/Assets/Frontend_Assets/banner_mens.png';
import banner_womens from './Components/Assets/Frontend_Assets/banner_women.png';
import banner_kids from './Components/Assets/Frontend_Assets/banner_kids.png';

const MainLayout = ({ children, setIsAuthenticated }) => (
  <>
    <Navbar setIsAuthenticated={setIsAuthenticated} />
    {children}
    <Footer />
  </>
);

const AuthLayout = ({ children }) => (
  <div className="auth-container">
    {children}
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user has valid token
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, verify token with backend
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <AuthLayout>
                <Signup setIsAuthenticated={setIsAuthenticated} />
              </AuthLayout>
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <AuthLayout>
                <Login setIsAuthenticated={setIsAuthenticated} />
              </AuthLayout>
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <MainLayout setIsAuthenticated={setIsAuthenticated}>
                <Shop />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/shop"
          element={
            isAuthenticated ? (
              <MainLayout setIsAuthenticated={setIsAuthenticated}>
                <Shop />
              </MainLayout>
            ) : (
              <Navigate to="/signup" replace />
            )
          }
        />
        <Route
          path="/men"
          element={
            isAuthenticated ? (
              <MainLayout setIsAuthenticated={setIsAuthenticated}>
                <ShopCategory banner={banner_mens} category='men' />
              </MainLayout>
            ) : (
              <Navigate to="/signup" replace />
            )
          }
        />
        <Route
          path="/women"
          element={
            isAuthenticated ? (
              <MainLayout setIsAuthenticated={setIsAuthenticated}>
                <ShopCategory banner={banner_womens} category='women' />
              </MainLayout>
            ) : (
              <Navigate to="/signup" replace />
            )
          }
        />
        <Route
          path="/kids"
          element={
            isAuthenticated ? (
              <MainLayout setIsAuthenticated={setIsAuthenticated}>
                <ShopCategory banner={banner_kids} category='kids' />
              </MainLayout>
            ) : (
              <Navigate to="/signup" replace />
            )
          }
        />
        <Route
          path="/product/:productId"
          element={
            isAuthenticated ? (
              <MainLayout setIsAuthenticated={setIsAuthenticated}>
                <Product />
              </MainLayout>
            ) : (
              <Navigate to="/signup" replace />
            )
          }
        />
        <Route
          path="/cart"
          element={
            isAuthenticated ? (
              <MainLayout setIsAuthenticated={setIsAuthenticated}>
                <Cart />
              </MainLayout>
            ) : (
              <Navigate to="/signup" replace />
            )
          }
        />
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <MainLayout setIsAuthenticated={setIsAuthenticated}>
                <NoPage />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;