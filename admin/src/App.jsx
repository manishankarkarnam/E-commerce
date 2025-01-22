import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import Header from './Components/Header/Header.jsx';
import AddProduct from './Components/AddProduct/AddProduct.jsx';
import ListProduct from './Components/ListProduct/ListProduct.jsx';
import Login from './Components/Login/Login.jsx';
import './App.css';
import axios from 'axios';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/verify-session', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setIsAuthenticated(response.data.authenticated);
        if (response.data.authenticated) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        {isAuthenticated ? (
          <>
            <Header setIsAuthenticated={setIsAuthenticated} />
            <div className="main-content">
              <Sidebar />
              <div className="content-area">
                <Routes>
                  <Route path="/" element={<Navigate to="/add-product" />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/list-products" element={<ListProduct />} />
                  <Route path="*" element={<Navigate to="/add-product" />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;










// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Sidebar from './Components/Sidebar/Sidebar.jsx';
// import Header from './Components/Header/Header.jsx';
// import AddProduct from './Components/AddProduct/AddProduct.jsx';
// import ListProduct from './Components/ListProduct/ListProduct.jsx';
// import Login from './Components/Login/Login.jsx';
// import './App.css';
// import axios from 'axios';

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await axios.get(
//           'http://localhost:4000/verify-session',
//           {
//             withCredentials: true,
//             headers: { 'Content-Type': 'application/json' }
//           }
//         );
//         setIsAuthenticated(response.data.authenticated);
//       } catch (err) {
//         console.error('Error verifying session:', err);
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Router>
//       <div className="app">
//           <Header />
//           <div className="main-content">
//             <Sidebar />
//             <div className="content-area">
//               <Routes>
//                 <Route path="/" element={<Navigate to="/add-product" />} />
//                 <Route path="/add-product" element={<AddProduct />} />
//                 <Route path="/list-products" element={<ListProduct />} />
//                 <Route path="*" element={<Navigate to="/add-product" />} />
//               </Routes>
//             </div>
//           </div>
//         </div>
//     </Router>
//   );
// };

// export default App;