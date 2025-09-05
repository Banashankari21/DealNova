import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../api/api';


const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await API.get('/orders'); // uses token automatically
      setOrders(response.data);                  // response.data should be array of orders
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };
  fetchOrders();
}, []);

  if (loading) return <div className="text-center mt-10">Loading orders...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white shadow rounded p-4">
              <h2 className="text-lg font-semibold">{order.productName}</h2>
              <p className="text-green-600 font-bold">${order.productPrice}</p>
              <p className="text-sm text-gray-500">Status: {order.status}</p>
              <p className="text-xs text-gray-400">Order ID: {order.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
