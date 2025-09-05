// src/routes/AppRoutes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import OrderPages from '../pages/OrderPages';
import ProductDetailPage from '../pages/ProductDetailPage';
import ProfilePage from '../pages/ProfilePage';

import ProtectedRoute from '../components/ProtectedRoute';

import MyOrders from '../pages/MyOrders.jsx';
import OrderConfirmed from '../pages/OrderConfirmed'; // ✅ New import

const AppRoutes = () => {
  return (
  
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<HomePage />} />

      {/* Cart Page */}
      <Route path="/cart" element={<CartPage />} />

      {/* Checkout Page - Protected */}
      <Route
        path="/checkout"
        element={
          
            <CheckoutPage />
          
        }
      />

      {/* Login & Signup Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Orders Page - Protected */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrderPages />
          </ProtectedRoute>
        }
      />

      {/* Single Product Detail Page */}
      <Route path="/product/:id" element={<ProductDetailPage />} />

      {/* Profile Page - Protected */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* My Orders */}
      <Route path="/myorders" element={<MyOrders />} />

      {/* ✅ Order Confirmed Page */}
      <Route path="/order-confirmed" element={<OrderConfirmed />} />

      {/* 404 Fallback */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
    
  );
};

export default AppRoutes;
