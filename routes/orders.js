const express = require('express');
const router = express.Router();


const Order = require('../Models/Order');
const Address = require('../Models/Address');


// // place oreder "manikanta"
// router.post('/postOrder', async (req, res) => {
//   try {
//     const orders = await Order.findByIdAndUpdate
//   }
//   catch(err) {
//     res.status(500).json({err_msg: "API Error occured while posting order"});
//   }
// })


// Place Order API 
router.post('/placeOrder', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { userId, products, total, address } = req.body;
    // if (!userId || !products || !total || !address) {
    //   return res.status(400).json({ success: false, message: 'Incomplete order information' });
    // }

    const newOrder = new Order({ userId, products, total, address});
    await newOrder.save();

    res.json({ success: true, orderId: newOrder._id, message: 'Order placed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Fetch Orders API 
router.get('/getAllOrders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('products').populate('address');

    res.status(200).json({ success: true, message: 'Orders fetched successfully', orders, NumberOfOrders: orders.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Change Order Status API 
router.put('/status/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Incomplete status information' });
    }

    await Order.updateOne({ _id: orderId }, { status });
    res.json({ success: true, message: 'Order status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Adding address of a particular user
router.post('/addresses/add', async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(200).json({ success: true, message: 'Address added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Get address of a particular user
router.get('/addresses/:userId', async (req, res) => {
  try {
    const address = await Address.find({ userId: req.params.userId });
    if (!address) {
      res.status(404).json({ success: false, message: 'Address not found' });
    } else {
      res.status(200).json({ success: true, message: 'Address fetched successfully', addressDetails: address });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;