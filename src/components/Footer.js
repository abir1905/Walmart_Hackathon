// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h5 className="font-bold text-lg mb-4">Quick Links</h5>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/profile" className="hover:text-white">My Account</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-bold text-lg mb-4">For Her</h5>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/#women" className="hover:text-white">Women Jeans</Link></li>
            <li><Link to="/#women" className="hover:text-white">Tops and Shirts</Link></li>
            <li><Link to="/#women" className="hover:text-white">Women Jackets</Link></li>
            <li><Link to="/#women" className="hover:text-white">Heels and Flats</Link></li>
            <li><Link to="/#women" className="hover:text-white">Women Accessories</Link></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-bold text-lg mb-4">For Him</h5>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/#men" className="hover:text-white">Men Jeans</Link></li>
            <li><Link to="/#men" className="hover:text-white">Men Shirts</Link></li>
            <li><Link to="/#men" className="hover:text-white">Men Shoes</Link></li>
            <li><Link to="/#men" className="hover:text-white">Men Accessories</Link></li>
            <li><Link to="/#men" className="hover:text-white">Men Jackets</Link></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-bold text-lg mb-4">Get Our App</h5>
          <button className="bg-transparent border-0 p-0">
            <img src="https://placehold.co/180x54/333333/FFFFFF?text=GET+IT+ON+Google+Play" alt="Google Play Store" className="rounded" />
          </button>
        </div>
      </div>
      <div className="bg-gray-900 py-4 text-center text-gray-500 text-sm">
        <p>&copy; 2024 DollarStore. Designed by You.</p>
      </div>
    </footer>
  );
};

export default Footer;