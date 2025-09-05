// backend/config/db.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

// ✅ Create a new Sequelize instance with DATABASE_URL from .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // set to console.log to enable SQL query logs

  // ✅ Uncomment below for production (e.g. render, railway, heroku with SSL)
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
});

// ✅ Immediately test the DB connection when imported
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the PostgreSQL database:', error);
  }
})();

module.exports = sequelize;
