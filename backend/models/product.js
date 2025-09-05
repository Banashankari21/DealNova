// backend/models/product.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT, allowNull: false },
  imageUrl: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },   // ✅ for category filters
  stock: { type: DataTypes.INTEGER },     // ✅ to track inventory
  rating: { type: DataTypes.FLOAT },      // ✅ for user ratings
  brand: { type: DataTypes.STRING }       // ✅ if you show brand on UI
});

module.exports = Product;
