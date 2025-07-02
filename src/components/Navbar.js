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
    
    // Abbreviate the address as requested
    const address = `${userAddress.area}, ${userAddress.locality}`;
    const maxLength = 25; // Adjust length as needed
    if (address.length > maxLength) {
      return address.substring(0, maxLength).trim() + '...';
    }
    return address;
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
        {/* Left Section (Logo & Location) */}
        <div className="flex items-center lg:flex-1">
          <Link to="/" className="text-2xl font-bold text-gray-800 mr-6">
            DollarStore<i className="fas fa-sparkle text-brand-pink ml-1"></i>
          </Link>
          
          <div 
            className="hidden lg:flex items-center cursor-pointer group"
            onClick={() => setShowAddressModal(true)}
          >
            <i className="fas fa-map-marker-alt text-gray-700 group-hover:text-brand-pink mr-2"></i>
            <div className="text-sm text-left overflow-hidden">
              <p className="text-gray-500 group-hover:text-brand-pink">Deliver to</p>
              <p 
                className="font-medium text-gray-800 group-hover:text-brand-pink truncate"
                title={userAddress?.fullAddress || 'Select a location'}
              >
                {formatShortAddress()}
              </p>
            </div>
          </div>
        </div>

        {/* Center Section (Primary Navigation) */}
        <div className="hidden lg:flex lg:justify-center font-medium space-x-8">
          <a href="#everything" className="text-gray-600 hover:text-brand-pink transition-colors">EVERYTHING</a>
          <a href="#women" className="text-gray-600 hover:text-brand-pink transition-colors">WOMEN</a>
          <a href="#men" className="text-gray-600 hover:text-brand-pink transition-colors">MEN</a>
          <a href="#accessories" className="text-gray-600 hover:text-brand-pink transition-colors">ACCESSORIES</a>
          <a href="#grocery" className="text-gray-600 hover:text-brand-pink transition-colors">GROCERIES</a>
        </div>
        
        {/* Mobile Nav Menu (managed by state) */}
         {isMenuOpen && (
           <div className="absolute top-full left-0 right-0 bg-white p-4 shadow-lg lg:hidden flex flex-col items-center space-y-3">
              <a href="#everything" className="text-gray-600 hover:text-brand-pink transition-colors py-2">EVERYTHING</a>
              <a href="#women" className="text-gray-600 hover:text-brand-pink transition-colors py-2">WOMEN</a>
              <a href="#men" className="text-gray-600 hover:text-brand-pink transition-colors py-2">MEN</a>
              <a href="#accessories" className="text-gray-600 hover:text-brand-pink transition-colors py-2">ACCESSORIES</a>
              <a href="#grocery" className="text-gray-600 hover:text-brand-pink transition-colors py-2">GROCERIES</a>
           </div>
         )}


        {/* Right Section (Icons & Links) */}
        <div className="flex items-center space-x-5 lg:flex-1 lg:justify-end">
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