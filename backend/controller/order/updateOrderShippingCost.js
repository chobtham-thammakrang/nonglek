const Order = require('../../models/orderModel');

const updateOrderShippingCost = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { shippingCost } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { shippingCost: Number(shippingCost) },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Order shipping cost updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order shipping cost:', error);
    res.status(500).json({ success: false, message: 'Error updating order shipping cost' });
  }
};

module.exports = updateOrderShippingCost;