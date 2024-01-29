// models/PastOrder.js
const mongoose = require('mongoose');

const pastOrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  // placeOrderData: {
  //   type: Object,
  //   required: true,
  // },
  status: {
    type: String,
    default: 'delivered', // Assuming past orders are already delivered
    enum: ['delivered'],
  },
}, { timestamps: true });

const PastOrder = mongoose.model('PastOrder', pastOrderSchema);

module.exports = PastOrder;
