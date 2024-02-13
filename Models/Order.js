// models/Order.js
const mongoose = require('mongoose');

//shema of order
const orderSchema = new mongoose.Schema({
  userId:{type: mongoose.Schema.ObjectId, ref: 'User', required:true},
  products: [{type: mongoose.Schema.ObjectId, ref: 'Product'}],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'pending', // Default status when the order is created
    enum: ['pending', 'processing', 'shipped', 'delivered'], // Possible order statuses
  },
  address: {type: mongoose.Schema.ObjectId, ref: 'Address'}
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;