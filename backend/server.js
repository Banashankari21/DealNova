


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// ✅ CORS setup (allows frontend to communicate with backend securely)
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  credentials: true, // enable cookies/auth headers if needed
}));

// ✅ Parse incoming JSON data before routes
app.use(express.json());

// 🔍 Debug middleware to log requests and parsed body for debugging
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  console.log('📦 req.body:', req.body);
  next();
});

// ✅ Import DB sync and models
const { syncDB } = require('./models');

// ✅ Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');

// ✅ Use routes with API prefixes
app.use('/api/auth', authRoutes);      // includes new save-card and saved-card endpoints
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', require('./routes/paymentRoutes'));


const PORT = process.env.PORT || 5000;

// ✅ Start server and sync DB on startup
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  try {
    await syncDB(); // ensures DB tables are up to date with model definitions
    console.log('✅ Database synchronized successfully');
  } catch (error) {
    console.error('❌ Error syncing database:', error);
  }
  console.log('🎉 Server is ready and listening!');
});
