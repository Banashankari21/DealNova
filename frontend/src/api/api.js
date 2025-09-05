/*import axios from 'axios';

// 🔗 Base Axios instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ Your backend URL
  withCredentials: true, // ✅ Allow cookies & credentials if needed
});

// 🔑 Add JWT token to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔐 Auth APIs
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const signupUser = (data) => API.post('/auth/signup', data);
export const getProfile = () => API.get('/auth/profile');

// 💳 Payments API
export const processPayment = (paymentData) =>
  API.post('/payment/process-payment', paymentData);

// 📦 Orders APIs
export const fetchOrders = () => API.get('/orders');
export const createOrder = (orderData) => API.post('/orders', orderData);

export default API;*/


import axios from 'axios';

// 🔗 Base Axios instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // backend URL
  withCredentials: true, // allow cookies / credentials if needed
});

// 🔑 Automatically attach JWT token to all requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔐 Auth APIs
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const signupUser = (data) => API.post('/auth/signup', data);
export const googleLoginUser = (googleData) => API.post('/auth/google', googleData);
export const getProfile = () => API.get('/auth/profile');

// 💳 Payments APIs
export const createPaymentToken = (cardDetails) =>
  API.post('/payment/create-token', cardDetails);

export const processPayment = (paymentData) =>
  API.post('/payment/process-payment', paymentData);

// 📦 Orders APIs
export const fetchOrders = () => API.get('/orders');
export const createOrder = (orderData) => API.post('/orders', orderData);

export default API;


