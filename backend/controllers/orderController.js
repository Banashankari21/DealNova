


// backend/controllers/orderController.js
/*const { Order } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ use authenticated user
    const { items, shipping, totalAmount, paymentId } = req.body;

    const order = await Order.create({
      userId,
      items,
      shipping,
      totalAmount,
      paymentId,
      paymentMethod: 'card', // or get from req.body
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error('❌ Error creating order:', err);
    res.status(500).json({ success: false, error: 'Failed to create order' });
  }
};*/



// backend/controllers/orderController.js
const { Order } = require('../models');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id; // authenticated user
    const { items, shipping, totalAmount, paymentId } = req.body;

    const order = await Order.create({
      userId,
      items,
      shipping,
      totalAmount,
      paymentId,
      paymentMethod: 'card', // adjust if needed
      status: 'pending',
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error('❌ Error creating order:', err);
    res.status(500).json({ success: false, error: 'Failed to create order' });
  }
};

// Get all orders of the logged-in user
exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({ where: { userId } });
    res.json({ success: true, orders });
  } catch (err) {
    console.error('❌ Error fetching orders:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
};
