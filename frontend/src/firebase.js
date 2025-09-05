// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBW2SsetHsbo6j_wVo5XqO9qmKG07b1Efo",
  authDomain: "tokenized-checkout-system.firebaseapp.com",
  projectId: "tokenized-checkout-system",
  storageBucket: "tokenized-checkout-system.appspot.com", // fixed typo: was firebasestorage.app
  messagingSenderId: "416189361683",
  appId: "1:416189361683:web:48a2d0c3dccc134da319e6",
  measurementId: "G-639825GKK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth and Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
