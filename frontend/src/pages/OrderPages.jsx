import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderPages = () => {
  const navigate = useNavigate();

  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Mens Shirts', value: 'mens-shirts' },
    { label: 'Womens Dresses', value: 'womens-dresses' },
    { label: 'Tops', value: 'tops' },
    { label: 'Mens Shoes', value: 'mens-shoes' },
    { label: 'Womens Shoes', value: 'womens-shoes' },
  ];

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('none');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const clothingCategories = categories.filter(c => c.value !== 'all').map(c => c.value);
      try {
        const results = await Promise.all(
          clothingCategories.map(category =>
            fetch(`https://dummyjson.com/products/category/${category}`)
              .then(res => res.json())
              .then(data => data.products.map(product => ({
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                category: category
              })))
          )
        );
        setProducts([].concat(...results));
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchData();
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const filteredProducts = products
    .filter(p =>
      (selectedCategory === 'all' || p.category === selectedCategory) &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'lowToHigh') return a.price - b.price;
      if (sortOption === 'highToLow') return b.price - a.price;
      return 0;
    });

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="bg-gradient-to-br from-[#1a2a47] to-[#0f172a] text-white min-h-screen px-4 py-8 flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-3xl font-extrabold text-yellow-400 mb-2 drop-shadow-md">Trendy Collection</h1>
      <p className="mb-8 text-gray-300 italic text-center">Discover your style from our latest collection</p>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mb-6 gap-4">
        <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md w-full md:w-auto flex-grow">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search here"
            className="flex-grow text-gray-800 focus:outline-none bg-transparent"
          />
          {searchQuery && (
            <FaTimes
              className="text-gray-500 ml-2 cursor-pointer hover:text-red-500"
              onClick={() => setSearchQuery('')}
            />
          )}
        </div>

        <select
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
          className="bg-white text-gray-800 rounded-full px-4 py-2 shadow-md w-full md:w-auto"
        >
          <option value="none">Sort</option>
          <option value="lowToHigh">Price: Low → High</option>
          <option value="highToLow">Price: High → Low</option>
        </select>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => { setSelectedCategory(cat.value); setCurrentPage(1); }}
            className={`px-4 py-2 rounded-full border transition duration-200 ${
              selectedCategory === cat.value
                ? 'bg-yellow-400 text-gray-900 font-semibold shadow-md'
                : 'border-gray-500 hover:bg-yellow-300 hover:text-gray-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl w-full">
        {currentProducts.map(product => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="bg-white text-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition duration-300"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-32 h-40 object-cover rounded mb-2"
            />
            <p className="text-sm font-semibold text-center">{product.title}</p>
            <p className="text-green-600 font-bold mt-1">${product.price}</p>
            <p className="text-xs text-gray-500 italic mt-1">{product.category.replace('-', ' ')}</p>
            <span className="w-12 border-b border-gray-400 mt-1"></span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-yellow-400 text-gray-900 rounded-full disabled:opacity-50 shadow-md"
        >
          Prev
        </button>
        <span className="px-3 py-1">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-yellow-400 text-gray-900 rounded-full disabled:opacity-50 shadow-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderPages;
