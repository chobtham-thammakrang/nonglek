const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingCost: {
    type: Number,
    default: null
  },
  address: {
    houseNumber: String,
    alley: String,
    road: String,
    district: String,
    subDistrict: String,
    province: String,
    postalCode: String
  },
  contactNumber: {
    type: String,
    required: true
  },
  additionalDetails: String,
  receiptImage: [],
  status: {
    type: String,
    enum: ['รอดำเนินการ', 'กำลังดำเนินการ', 'อยู่ระหว่าจัดส่ง', 'จัดส่งแล้ว'],
    default: 'รอดำเนินการ'
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;