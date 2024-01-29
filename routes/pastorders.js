// routes/pastOrders.js
const express = require('express');
const router = express.Router();

const Order = require('../Models/Order');
const PastOrder = require('../Models/Pastorders');

// Fetch and create past orders for a specific user
router.post('/fetch-and-create/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch data from "Place Order" API using userId
    const placeOrderData = await Order.find({ userId });
    console.log(placeOrderData)
    res.status(200).json({ success: true, data: placeOrderData});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
