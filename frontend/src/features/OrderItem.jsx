import React from 'react';

const OrderItem = ({ order }) => {
  return (
    <div className="border p-4 rounded mb-4 shadow">
      <h3 className="font-semibold">Order #{order.id}</h3>
      <p>Date: {order.date}</p>
      <p>Status: {order.status}</p>
      <ul className="mt-2">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <div className="font-bold mt-2">Total: ₹{order.total}</div>
    </div>
  );
};

export default OrderItem;
