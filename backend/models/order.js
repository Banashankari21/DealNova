// backend/models/order.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  items: { type: DataTypes.JSONB, allowNull: false , defaultValue:[]},
  totalAmount: { type: DataTypes.DECIMAL, allowNull: false,defaultValue: 0 },
  shipping: { type: DataTypes.JSONB, allowNull: false,defaultValue: {} },
  paymentMethod: { type: DataTypes.STRING, allowNull: false,defaultValue:0 },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
});


module.exports = Order;
