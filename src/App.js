import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Deals from "./components/Deals";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";

function App() {
  return (
    <Router>
      <div className="bg-[#e6f1fc] min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Deals />
              </>
            } />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
