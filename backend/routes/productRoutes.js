// backend/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct
} = require('../controllers/productController');

// ✅ GET /api/products - Fetch all products
router.get('/', getProducts);

// ✅ GET /api/products/:id - Fetch single product by ID
router.get('/:id', getProductById);

// ✅ POST /api/products - Create a new product (admin usage)
router.post('/', createProduct);

module.exports = router;
