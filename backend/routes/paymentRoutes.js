// backend/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();

const {processPayment} = require('../controllers/paymentController');

// ✅ Only Payment route
router.post('/process-payment', processPayment);

module.exports = router;
