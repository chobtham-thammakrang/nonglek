const Order = require('../../models/orderModel');

const updateOrderReceiptImage = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { receiptImage } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { receiptImage: [receiptImage] },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Order receipt image updated successfully', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order receipt image:', error);
    res.status(500).json({ success: false, message: 'Error updating order receipt image' });
  }
};

module.exports = updateOrderReceiptImage;