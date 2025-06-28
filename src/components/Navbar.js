// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartTotal } = useCart();

  return (
    <header className="bg-[#6d9eff] shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          DollarStore<i className="fas fa-sparkle text-brand-pink ml-1"></i>
        </Link>

        {/* Primary Navigation */}
        <div 
          id="nav-links" 
          className={`${isMenuOpen ? 'flex flex-col absolute top-16 left-0 right-0 bg-white p-4 shadow-lg' : 'hidden'} lg:flex lg:items-center lg:space-x-8 font-medium`}
        >
          <a href="#everything" className="text-gray-600 hover:text-brand-pink transition-colors py-2 lg:py-0">EVERYTHING</a>
          <a href="#women" className="text-gray-600 hover:text-brand-pink transition-colors py-2 lg:py-0">WOMEN</a>
          <a href="#men" className="text-gray-600 hover:text-brand-pink transition-colors py-2 lg:py-0">MEN</a>
          <a href="#accessories" className="text-gray-600 hover:text-brand-pink transition-colors py-2 lg:py-0">ACCESSORIES</a>
          <a href="#grocery" className="text-gray-600 hover:text-brand-pink transition-colors py-2 lg:py-0">GROCERIES</a>
        </div>

        {/* Right Side Icons & Links */}
        <div className="flex items-center space-x-5">
          <Link to="/about" className="hidden md:block text-sm font-medium text-gray-600 hover:text-brand-pink">ABOUT</Link>
          <Link to="/contact" className="hidden md:block text-sm font-medium text-gray-600 hover:text-brand-pink">CONTACT US</Link>
          <span className="text-sm font-bold text-gray-800">₹{cartTotal.toFixed(2)}</span>
          <Link to="/cart" className="text-gray-600 hover:text-brand-pink">
            <i className="fas fa-shopping-cart fa-lg"></i>
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-brand-pink">
            <i className="fas fa-user-circle fa-lg"></i>
          </Link>
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} fa-lg text-gray-600`}></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;