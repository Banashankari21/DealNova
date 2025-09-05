import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmed = () => {
  const location = useLocation();
  const { orderId, amount, shipping } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a2a47] to-[#0f172a] text-white px-4">
      <div className="bg-white text-gray-900 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-600">✅ Order Confirmed!</h2>

        {orderId ? <p className="mb-2">Your order ID is <strong>{orderId}</strong></p> : <p className="mb-2">Thank you for your purchase!</p>}
        {amount && <p className="mb-2">Total Amount: <strong>${amount}</strong></p>}

        {shipping && (
          <div className="mt-4 text-left">
            <h3 className="font-semibold mb-1">Shipping Details:</h3>
            <p><strong>Name:</strong> {shipping.name}</p>
            <p><strong>Address:</strong> {shipping.address}</p>
            <p><strong>Phone:</strong> {shipping.phone}</p>
          </div>
        )}

        <button
          onClick={() => window.location.replace('/')}
          className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-xl font-semibold shadow transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmed;
