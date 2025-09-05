import React, { useState, useContext } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login, signup, loginWithGoogle } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true); // toggle between Login / Sign Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // For redirecting user after login/signup

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) =>
    password.length >= 6 && /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters and include at least one special character.');
      return;
    }

    setError('');
    try {
  let success;
  if (isLogin) {
    success = await login(email, password);
    
  } else {
    success = await signup(email, password);
    navigate('/orders');
  }

  if (success) {
    navigate('/orders'); // only redirect if login/signup succeeded
  }
} catch (err) {
  setError(err.response?.data?.message || err.message || 'Authentication failed');
}

  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();

      // ✅ Redirect user after successful Google login/signup
      navigate('/orders');
    } catch (err) {
      console.error(err);
      setError('Google login failed.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#1a2a47] to-[#0f172a] flex items-center justify-center px-4">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 pt-16 w-full max-w-sm">
        {/* User Icon */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-yellow-400 p-4 rounded-full shadow-md">
          <FaUser className="text-gray-900 text-2xl" />
        </div>

        <h2 className="text-center text-xl font-bold mb-6 text-gray-800">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center bg-gray-100 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400">
            <FaUser className="text-gray-600 mr-3" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent flex-grow focus:outline-none text-gray-800"
            />
          </div>

          <div className="flex items-center bg-gray-100 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-yellow-400">
            <FaLock className="text-gray-600 mr-3" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent flex-grow focus:outline-none text-gray-800"
            />
          </div>

          <div className="text-right">
            {isLogin && (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a href="#" className="text-sm text-gray-600 hover:underline">
                Forgot password?
              </a>
            )}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-full font-semibold shadow transition duration-300"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-yellow-500 font-medium hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center space-x-3 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 shadow-sm transition duration-300"
          >
            <FcGoogle className="text-2xl" />
            <span className="text-gray-700">Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
