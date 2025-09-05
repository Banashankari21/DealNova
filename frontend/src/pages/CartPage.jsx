import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#1a2a47] to-[#0f172a] text-white px-4 py-10 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">

        <h1 className="text-3xl font-bold text-yellow-400 border-b border-gray-600 pb-2 text-center">🛒 Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-700">
            <p className="text-gray-400 mb-4">Your cart is currently empty.</p>
            <button
              onClick={() => navigate('/orders')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-full transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white text-gray-900 rounded-2xl shadow flex flex-col md:flex-row items-center justify-between p-4 border border-gray-200"
                >
                  <div className="flex items-center mb-4 md:mb-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-xl mr-4 border border-gray-300"
                    />
                    <div>
                      <p className="font-semibold text-lg">{item.title}</p>
                      <p className="text-green-600 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="w-8 h-8 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full text-lg font-bold transition"
                    >–</button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="w-8 h-8 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full text-lg font-bold transition"
                    >+</button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total summary */}
            <div className="bg-white text-gray-900 rounded-2xl shadow p-4 flex justify-between items-center border border-gray-200 mt-4">
              <p className="text-xl font-bold">Total:</p>
              <p className="text-green-600 text-xl font-bold">${totalPrice.toFixed(2)}</p>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={clearCart}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate('/checkout')}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-full font-semibold transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;