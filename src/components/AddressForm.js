import React, { useState } from 'react';
import useGeolocation from '../hooks/useGeolocation';
import reverseGeocode from '../services/geocodeService';

const AddressForm = ({ onAddressChange }) => {
  const { coords, error, getLocation, isLoading } = useGeolocation();
  const [formData, setFormData] = useState({
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
  const [formErrors, setFormErrors] = useState({});

  React.useEffect(() => {
    if (coords) {
      reverseGeocode(coords.lat, coords.lng)
        .then(result => {
          const addressComponents = parseAddressComponents(result.address_components);
          const newFormData = {
            ...formData,
            area: addressComponents.route || '',
            city: addressComponents.locality || addressComponents.city || '',
            state: addressComponents.state || '',
            pincode: addressComponents.postal_code || '',
            locality: addressComponents.neighborhood || addressComponents.sublocality || '',
            fullAddress: result.formatted_address
          };
          
          setFormData(newFormData);
        })
        .catch(err => {
          console.error('Geocoding error:', err);
          setFormErrors({ general: err.message || 'Failed to fetch address details' });
        });
    }
  }, [coords]);

  const parseAddressComponents = (components) => {
    const address = {
      route: '',
      locality: '',
      city: '',
      state: '',
      postal_code: '',
      neighborhood: '',
      sublocality: '',
      country: ''
    };

    components.forEach(component => {
      if (component.types.includes('route')) address.route = component.long_name;
      if (component.types.includes('locality')) address.locality = component.long_name;
      if (component.types.includes('administrative_area_level_2')) address.city = component.long_name;
      if (component.types.includes('administrative_area_level_1')) address.state = component.long_name;
      if (component.types.includes('postal_code')) address.postal_code = component.long_name;
      if (component.types.includes('neighborhood')) address.neighborhood = component.long_name;
      if (component.types.includes('sublocality')) address.sublocality = component.long_name;
      if (component.types.includes('country')) address.country = component.long_name;
    });

    return address;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) errors.phone = 'Valid 10-digit phone required';
    if (!formData.pincode || !/^\d{6}$/.test(formData.pincode)) errors.pincode = 'Valid 6-digit pincode required';
    if (!formData.locality) errors.locality = 'Locality is required';
    if (!formData.area) errors.area = 'Area/Street is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.state) errors.state = 'State is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onAddressChange({
      ...formData,
      fullAddress: `${formData.area}, ${formData.locality}, ${formData.city}, ${formData.state} ${formData.pincode}`
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <button
          type="button"
          onClick={getLocation}
          disabled={isLoading}
          className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i> Locating...
            </>
          ) : (
            <>
              <i className="fas fa-location-arrow mr-2"></i>
              Use my current location
            </>
          )}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {formErrors.general && <p className="text-red-500">{formErrors.general}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Mobile Number</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Pincode</label>
          <input
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="6-digit pincode"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formErrors.pincode && <p className="text-red-500 text-sm">{formErrors.pincode}</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Locality</label>
          <input
            name="locality"
            value={formData.locality}
            onChange={handleChange}
            placeholder="Locality/Area"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formErrors.locality && <p className="text-red-500 text-sm">{formErrors.locality}</p>}
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 mb-1">Address (Area and Street)</label>
        <textarea
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="House no., building, street, area"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="2"
        ></textarea>
        {formErrors.area && <p className="text-red-500 text-sm">{formErrors.area}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">City/District/Town</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">State</label>
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formErrors.state && <p className="text-red-500 text-sm">{formErrors.state}</p>}
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 mb-1">Landmark (Optional)</label>
        <input
          name="landmark"
          value={formData.landmark}
          onChange={handleChange}
          placeholder="E.g. near main market"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="mt-4">
        <label className="block text-gray-700 mb-2">Address Type</label>
        <div className="flex space-x-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="addressType"
              value="home"
              checked={formData.addressType === 'home'}
              onChange={handleChange}
              className="mr-2"
            />
            Home (All day delivery)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="addressType"
              value="work"
              checked={formData.addressType === 'work'}
              onChange={handleChange}
              className="mr-2"
            />
            Work (Delivery between 10 AM - 5 PM)
          </label>
        </div>
      </div>
      
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
        >
          SAVE AND DELIVER HERE
        </button>
        <button
          onClick={() => onAddressChange(null)}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 font-medium"
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default AddressForm;