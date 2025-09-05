import React, { useState } from 'react';

const PaymentForm = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ cardNumber, expiry, cvv });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="1234 5678 9012 3456"
        />
      </div>
      <div className="flex space-x-4">
        <div>
          <label className="block">Expiry</label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="MM/YY"
          />
        </div>
        <div>
          <label className="block">CVV</label>
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="123"
          />
        </div>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
