import React, { useState } from 'react';
import axios from '../api/api'; // Adjust path if needed
import { encryptCardData } from '../utils/encryption';

const SaveCard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const encrypted = encryptCardData(cardNumber, expiryMonth, expiryYear, cvv);

      const response = await axios.post('/api/auth/saved-card', {
        cardToken: encrypted,
      });

      if (response.data.success) {
        setMessage('✅ Card saved successfully (encrypted)');
        setCardNumber('');
        setExpiryMonth('');
        setExpiryYear('');
        setCvv('');
      } else {
        setMessage('❌ Failed to save card');
      }
    } catch (error) {
      console.error('Error saving card:', error);
      setMessage('❌ Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Save Card</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Expiry Month (MM)"
          value={expiryMonth}
          onChange={(e) => setExpiryMonth(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Expiry Year (YYYY)"
          value={expiryYear}
          onChange={(e) => setExpiryYear(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Card
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
};

export default SaveCard;