// scripts/fetchAndStoreProducts.js

// Dynamic import for node-fetch when using require()
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const { Product } = require('../models');
const sequelize = require('../config/db');

const categories = ['mens-shirts', 'womens-dresses', 'tops', 'mens-shoes', 'womens-shoes'];

async function fetchAndStore() {
  try {
    await sequelize.sync({ alter: true });

    for (const category of categories) {
      const res = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await res.json();

      for (const p of data.products) {
        await Product.create({
          name: p.title,
          description: p.description,
          price: p.price,
          thumbnail: p.thumbnail,
          category: category,
        });
      }
    }

    console.log('✅ Products stored in DB successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

fetchAndStore();
