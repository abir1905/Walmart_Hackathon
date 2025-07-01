import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import components
import Home from './components/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Login from './components/login';
import Signup from './components/signup';
import ProtectedRoute from './components/ProtectedRoute';
import AuthLayout from './components/AuthLayout';
import ChatBot from './components/ChatBot';

// Add LocationProvider context
import { LocationProvider } from './context/LocationContext';

const AppContent = () => {
  const location = useLocation();
  const [, setUser] = useState(null);
  const isAuthRoute = 
    location.pathname === '/login' || location.pathname === '/signup';
  
  // Track if welcome toast has been shown
  const welcomeToastShown = useRef(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/login/success", {
          credentials: "include",
        });
        
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
          
          // Check for login success parameter and if toast hasn't been shown
          if (location.search.includes('login=success') && !welcomeToastShown.current) {
            toast.success(`Welcome back ${data.user.displayName || data.user.name}!`);
            welcomeToastShown.current = true;  // Mark as shown
            
            // Clean URL without causing re-render
            const cleanUrl = window.location.pathname;
            window.history.replaceState(null, "", cleanUrl);
          }
        }
      } catch (error) {
        console.error("Login check error:", error);
      }
    };

    checkLogin();
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FEF8F8]">
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
                <Home />
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
      <ChatBot />
    </div>
  );
};

function App() {
  return (
    <LocationProvider>
      <Router>
        <AppContent />
      </Router>
    </LocationProvider>
  );
}

export default App;