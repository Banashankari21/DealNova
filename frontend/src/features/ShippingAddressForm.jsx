import React, { useState } from 'react';

const ShippingAddressForm = ({ onSubmit }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Shipping Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Enter your full shipping address"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save Address
      </button>
    </form>
  );
};

export default ShippingAddressForm;
