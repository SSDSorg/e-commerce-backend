const express = require('express');
const router = express.Router();


const Order = require('../Models/Order');


// Create a new order
router.post('/orders', async (req, res) => {
  try {
    const { userId, items, total, address } = req.body;

    if (!userId || !items || !total || !address) {
      return res.status(400).json({ success: false, message: 'Incomplete order information' });
    }

    const newOrder = new Order({ userId, items, total, address });
    await newOrder.save();

    res.status(201).json({ success: true, orderId: newOrder._id, message: 'Order placed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Fetch orders for a specific user
router.get('/orders/user/:userId',  async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json({ success: true, message: 'User orders fetched successfully', orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Update the order status
router.put('/orders/:orderId/status', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Incomplete status information' });
    }

    await Order.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: 'Order status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});




module.exports = router;
