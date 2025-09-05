import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaTimes, FaUser } from 'react-icons/fa';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-gray-900 text-white px-6 md:px-10 py-4 shadow-md sticky top-0 z-50">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
          <span role="img" aria-label="cart">🛒</span>
          <span className="text-yellow-400">Deal</span>Nova
        </Link>

        {/* Right: Nav links */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <Link to="/" className="hover:text-yellow-400 font-medium">Home</Link>
          <Link to="/about" className="hover:text-yellow-400 font-medium">About</Link>
          <Link to="/contact" className="hover:text-yellow-400 font-medium">Contact</Link>

          {/* 🔶 Add My Orders Button */}
          <Link to="/myorders" className="hover:text-yellow-400 font-medium">My Orders</Link>

          <Link to="/profile" className="text-xl hover:text-yellow-400">
            <FaUser />
          </Link>

          <Link to="/login">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-1.5 rounded-full font-semibold shadow transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
