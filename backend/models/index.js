// backend/models/index.js

const sequelize = require('../config/db');

// ✅ Import models
const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const Payment = require('./payment');

/**
 * ✅ Define model associations clearly
 */

// User ➔ Orders (1:M)
User.hasMany(Order, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
Order.belongsTo(User, { foreignKey: 'userId' });

// User ➔ Payments (1:M)
User.hasMany(Payment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
Payment.belongsTo(User, { foreignKey: 'userId' });

// Payment ➔ Orders (1:M)
Payment.hasMany(Order, {
  foreignKey: 'paymentId',
  onDelete: 'SET NULL',
});
Order.belongsTo(Payment, { foreignKey: 'paymentId' });

// Product ➔ Orders (1:M)
Product.hasMany(Order, {
  foreignKey: 'productId',
  onDelete: 'SET NULL',
});
Order.belongsTo(Product, { foreignKey: 'productId' });

/**
 * 🔹 Synchronize DB function
 */
const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ All models were synchronized successfully.');
  } catch (error) {
    console.error('❌ Error synchronizing models:', error);
  }
};

module.exports = {
  sequelize,
  syncDB,
  User,
  Product,
  Order,
  Payment,
};
