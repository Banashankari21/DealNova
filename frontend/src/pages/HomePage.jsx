import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/orders');
  };

 


  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#1a2a47] to-[#0f172a] text-white flex items-center justify-center px-6 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl w-full">
        
        {/* Text Section */}
        <div className="md:w-1/2 mb-12 md:mb-0">
          <p className="uppercase tracking-[0.3em] text-yellow-300 text-xs mb-4 font-semibold">Urban Edge</p>
          <h1 className="text-6xl md:text-8xl font-extrabold font-cursive mb-4 drop-shadow-lg">
            Deal<span className="text-yellow-400">Nova</span>
          </h1>
          <p className="text-xl md:text-2xl font-light italic mb-2">Explore and Discover</p>
          <p className="text-xl md:text-2xl font-light italic mb-8">Your own style</p>

          <button
            onClick={handleShopNow}
            className="relative group bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition duration-300 overflow-hidden shadow-lg"
          >
            <span className="relative z-10">Shop Now</span>
            <div className="text-xs text-gray-800 mt-1">just one click checkout away</div>
            <span className="absolute left-0 bottom-0 w-0 h-1 bg-yellow-600 transition-all group-hover:w-full"></span>
          </button>
        </div>

        


        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src="/images/hero-fashion.jpeg"
            alt="Fashion Model"
            className="rounded-3xl object-cover w-72 md:w-[500px] shadow-2xl border-2 border-yellow-400"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;