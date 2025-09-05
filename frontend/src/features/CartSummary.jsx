import React from 'react';

const CartSummary = ({ items }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
      <ul className="divide-y">
        {items.map((item) => (
          <li key={item.id} className="py-2 flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 font-bold text-xl">Total: ₹{total}</div>
    </div>
  );
};

export default CartSummary;
