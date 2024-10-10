const { Order, User } = require('../../models');

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('items.productId');

    if (!orders.length) {
      console.log('No orders found');
      return res.json({ success: true, orders: [] });
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching all orders:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
};

module.exports = getAllOrders;
