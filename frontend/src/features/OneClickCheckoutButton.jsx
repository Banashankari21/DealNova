import React from 'react';

const OneClickCheckoutButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      One-Click Checkout
    </button>
  );
};

export default OneClickCheckoutButton;
