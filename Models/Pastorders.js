const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'processing', 'shipped', 'delivered'],
  },
  address: {
    country: String,
    fullName: String,
    mobileNum: String,
    pincode: String,
    houseName: String,
    villName: String,
    mandalName: String,
    stateName: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
