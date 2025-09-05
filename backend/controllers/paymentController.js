// backend/controllers/paymentController.js
/*exports.processPayment = async (req, res) => {
  try {
    const { amount, cardNumber, expiry, cvv } = req.body;

    // 🚨 NOTE: In real-world apps, never handle raw card details directly!
    // You should integrate with a payment gateway like Stripe, Razorpay, PayPal etc.
    // For now, we’ll just simulate payment success.

    console.log("Processing payment:", { amount, cardNumber, expiry });

    return res.status(200).json({
      success: true,
      message: "Payment processed successfully",
      orderId: Math.floor(Math.random() * 1000000), // mock order id
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Payment failed",
      error: error.message,
    });
  }
};
*/

// backend/controllers/paymentController.js
exports.processPayment = async (req, res) => {
  try {
    const { amount, cardNumber, expiry, cvv } = req.body;

    console.log("Processing payment:", { amount, cardNumber, expiry });

    // Create a mock payment ID (in real-world, this comes from Stripe/Razorpay)
    const paymentId = Math.floor(Math.random() * 1000000); // mock ID

    return res.status(200).json({
      success: true,
      message: "Payment processed successfully",
      payment: { id: paymentId, amount }, // ✅ return as `payment.id`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Payment failed",
      error: error.message,
    });
  }
};
