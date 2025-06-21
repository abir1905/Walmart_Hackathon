import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Deals from './components/Deals';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Login from './components/login';
import Signup from './components/signup';
import ProtectedRoute from './components/ProtectedRoute';
import AuthLayout from './components/AuthLayout'; // Handles animated auth layout

const AppContent = () => {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="bg-[#e6f1fc] min-h-screen flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {!isAuthRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* Animated Auth Pages */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Protected Main App Pages */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <Hero />
                  <Deals />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isAuthRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
