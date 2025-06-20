import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Deals from "./components/Deals";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Login from "./components/login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";

// Create a wrapper for route-aware layout rendering
const AppContent = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";

  return (
    <div className="bg-[#e6f1fc] min-h-screen flex flex-col">
      {!isLoginRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
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
      {!isLoginRoute && <Footer />}
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
