const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ✅ Authentication routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/google', authController.googleLogin);

// ✅ Profile routes
router.get('/profile', authController.getProfile);
router.put('/profile', authController.updateProfile);

module.exports = router;
