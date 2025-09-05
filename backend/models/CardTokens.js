// backend/models/CardTokens.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CardTokens = sequelize.define('CardTokens', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  token: { type: DataTypes.STRING, unique: true, allowNull: false },
  encryptedCard: { type: DataTypes.STRING, allowNull: false },
  cardLast4: { type: DataTypes.STRING },
  cardBrand: { type: DataTypes.STRING },
  expiryMonth: { type: DataTypes.STRING },
  expiryYear: { type: DataTypes.STRING },
},{
  tableName: 'CardTokens',
  timestamps: true, // ✅ adds createdAt and updatedAt
});

module.exports = CardTokens;
