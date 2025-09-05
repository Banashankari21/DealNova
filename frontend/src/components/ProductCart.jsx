import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-700">₹{product.price}</p>
      <button 
        onClick={() => addToCart(product)} 
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
