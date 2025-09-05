// src/utils/encryption.js
import CryptoJS from 'crypto-js';

const ENCRYPTION_SECRET = process.env.REACT_APP_ENCRYPTION_SECRET;

export const encryptCardData = (cardNumber, expiryMonth, expiryYear, cvv) => {
  const payload = JSON.stringify({ cardNumber, expiryMonth, expiryYear, cvv });
  const encrypted = CryptoJS.AES.encrypt(payload, ENCRYPTION_SECRET).toString();
  return encrypted;
};

export const decryptCardData = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_SECRET);
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decrypted;
};