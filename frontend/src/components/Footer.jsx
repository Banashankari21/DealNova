import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-gray-800 border-t border-gray-700 text-gray-400 text-sm mt-12">
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* 🔷 Links and Social */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        {/* 🔗 Internal Links */}
        <div className="flex space-x-6">
          <Link to="/about" className="hover:text-yellow-400">About</Link>
          <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
          <Link to="/privacy" className="hover:text-yellow-400">Privacy</Link>
        </div>

        {/* 🔗 Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaFacebookF /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaLinkedinIn /></a>
        </div>
      </div>

      {/* 🔷 Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* 🔷 Payment Icons */}
      <div className="flex justify-center space-x-6 text-2xl">
        <FaCcVisa />
        <FaCcMastercard />
        <FaCcPaypal />
        <FaCcAmex />
      </div>

      {/* 🔷 Copyright */}
      <p className="text-center mt-6">&copy; {new Date().getFullYear()} DealNova. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
