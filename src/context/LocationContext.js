import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState({
    fullAddress: '',
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    area: '',
    city: '',
    state: '',
    landmark: '',
    addressType: 'home'
  });

  return (
    <LocationContext.Provider 
      value={{ 
        userAddress, 
        setUserAddress
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);