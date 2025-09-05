import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import axios from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  try {
    const savedUser = localStorage.getItem('user');
    if (savedUser && savedUser !== "undefined") {
      setUser(JSON.parse(savedUser));
    }
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
    localStorage.removeItem('user'); // clean corrupted value
  }
}, []);


  const login = async (email, password) => {
  try {
    const res = await axios.post('/auth/login', { email: email.trim(), password: password.trim() });

    if (!res.data || !res.data.user || !res.data.token) {
  throw new Error(res.data?.message || 'Login failed');
}


    setUser(res.data.user);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token); // store JWT for API auth
    return true; // indicate success
  } catch (err) {
    console.error('Login error:', err.response?.data || err.message);
    throw err; // propagate error to LoginPage
  }
};


  const signup = async (email, password) => {
    try {
      const res = await axios.post('/auth/signup', { email, password });
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data;
    } catch (err) {
      console.error(err);
      alert('Signup failed');
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userData = result.user;

      const res = await axios.post('/auth/google', {
        email: userData.email,
        googleId: userData.uid,
        name: userData.displayName,
      });

      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data;
    } catch (err) {
      console.error(err);
      alert('Google login failed');
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const updateProfile = async (updatedData) => {
    try {
      const res = await axios.put('/auth/profile', updatedData);
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Profile updated successfully');
      return res.data;
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, loginWithGoogle, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
