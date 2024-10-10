const Order = require('../../models/orderModel');

const updateOrderAdditionalDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { additionalDetails } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { additionalDetails },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Order additional details updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order additional details:', error);
    res.status(500).json({ success: false, message: 'Error updating order additional details' });
  }
};

module.exports = updateOrderAdditionalDetails;