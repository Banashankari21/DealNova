import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className="flex justify-between items-center bg-gray-800 rounded-lg p-4 mb-4 shadow">
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <img
          src={item.image || '/placeholder.png'}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />

        {/* Product Details */}
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-400">₹{item.price}</p>

          {/* Quantity Controls */}
          <div className="flex items-center mt-2 space-x-2">
            <button
              onClick={() => decrementQuantity(item.id)}
              className="bg-gray-700 text-white px-2 rounded hover:bg-gray-600"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => incrementQuantity(item.id)}
              className="bg-gray-700 text-white px-2 rounded hover:bg-gray-600"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-600"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
