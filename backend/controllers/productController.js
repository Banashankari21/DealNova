

// backend/controllers/productController.js

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { Product } = require('../models');


// 🔹 Fetch all products from DummyJSON
exports.getProducts = async (req, res) => {
  try {
    const categories = ['mens-shirts', 'womens-dresses', 'tops', 'mens-shoes', 'womens-shoes'];

    const results = await Promise.all(
      categories.map(category =>
        fetch(`https://dummyjson.com/products/category/${category}`)
          .then(res => res.json())
          .then(data => data.products.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            category: category
          })))
      )
    );

    const products = [].concat(...results);
    res.json(products);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Fetch single product by ID from DummyJSON
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const product = await response.json();

    if (!product || product.message === 'Product not found') {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      category: product.category
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 🔹 Create a product in your DB (admin route)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, stock } = req.body;

    const newProduct = await Product.create({
      name,
      description,
      price,
      imageUrl,
      category,
      stock
    });

    res.status(201).json(newProduct);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
};
