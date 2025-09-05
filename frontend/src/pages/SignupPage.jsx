import React, { useState } from 'react';
import { FaUser, FaLock, FaPhone } from 'react-icons/fa';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) =>
    password.length >= 6 && /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters and include at least one special character.');
      return;
    }

    setError('');
    // Do signup logic here (API call, etc.)
    console.log('Signup submitted:', { email, password, contact });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#1a2a47] to-[#0f172a] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Sign Up</h1>
        <p className="text-center text-gray-600 mb-6">Create an account to enjoy faster checkout and order tracking.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center bg-gray-100 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400">
            <FaUser className="text-gray-600 mr-3" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent flex-grow focus:outline-none text-gray-800"
            />
          </div>

          <div className="flex items-center bg-gray-100 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400">
            <FaLock className="text-gray-600 mr-3" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent flex-grow focus:outline-none text-gray-800"
            />
          </div>

          <div className="flex items-center bg-gray-100 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400">
            <FaPhone className="text-gray-600 mr-3" />
            <input
              type="tel"
              placeholder="Contact number"
              value={contact}
              maxLength={10}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                setContact(digits);
              }}
              required
              className="bg-transparent flex-grow focus:outline-none text-gray-800"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-full font-semibold shadow transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;