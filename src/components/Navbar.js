import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import AddressForm from './AddressForm';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const { cartTotal } = useCart();
  const { userAddress, setUserAddress } = useLocation();

  const formatShortAddress = () => {
    if (!userAddress?.fullAddress) return 'Select Location';
    
    const parts = userAddress.fullAddress.split(',');
    if (parts.length < 2) return userAddress.fullAddress;
    
    return `${parts[0]}, ${parts[1]}`;
  };

  return (
    <header className="bg-[#6d9eff] shadow-md sticky top-0 z-50">
      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Delivery Address</h3>
              <button 
                onClick={() => setShowAddressModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <AddressForm 
              onAddressChange={(address) => {
                if (address) {
                  setUserAddress(address);
                  setShowAddressModal(false);
                } else {
                  setShowAddressModal(false);
                }
              }} 
            />
          </div>
        </div>
      )}

      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800 mr-6">
            DollarStore<i className="fas fa-sparkle text-brand-pink ml-1"></i>
          </Link>
          
          {/* Location Selector */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => setShowAddressModal(true)}
          >
            <i className="fas fa-map-marker-alt text-gray-700 group-hover:text-brand-pink mr-2"></i>
            <div className="text-sm text-left">
              <p className="text-gray-500 group-hover:text-brand-pink">Deliver to</p>
              <p className="font-medium text-gray-800 group-hover:text-brand-pink">
                {formatShortAddress()}
              </p>
            </div>
          </div>
        </div>

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