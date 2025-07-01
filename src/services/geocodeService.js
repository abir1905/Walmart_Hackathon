const reverseGeocode = async (lat, lng) => {
  try {
    const response = await fetch(`http://localhost:5000/reverse-geocode?lat=${lat}&lng=${lng}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Address not found');
    }
    
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Geocoding error:', err);
    throw new Error('Failed to fetch address details: ' + err.message);
  }
};

export default reverseGeocode;