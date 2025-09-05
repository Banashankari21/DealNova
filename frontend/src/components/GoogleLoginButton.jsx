import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../api/api';

const GoogleLoginButton = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('/auth/google-login', {
        token: credentialResponse.credential,
      });
      console.log(res.data);
      // Save user and token in context/localStorage as done in AuthContext
    } catch (err) {
      console.error(err);
    }
  };

  const handleError = () => {
    console.error('Login Failed');
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

export default GoogleLoginButton;
