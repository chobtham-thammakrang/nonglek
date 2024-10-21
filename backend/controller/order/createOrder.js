const Order = require('../../models/orderModel');
const Product = require('../../models/productModel');
const addToCartModel = require('../../models/cartProduct');

const createOrder = async (req, res) => {
  try {
    console.log('Received order data:', req.body);
    const { items, address, contactNumber, additionalDetails, receiptImage } = req.body;
    const userId = req.user.id;

    // Parse items and address
    const parsedItems = JSON.parse(items);
    const parsedAddress = JSON.parse(address);

    // Validate required fields
    if (!parsedItems || !Array.isArray(parsedItems) || parsedItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid or empty items array' });
    }
    
    if (!parsedAddress || typeof parsedAddress !== 'object' || Object.keys(parsedAddress).length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid or missing address' });
    }
    
    if (!contactNumber) {
      return res.status(400).json({ success: false, message: 'Contact number is required' });
    }

    // Fetch product details and calculate total amount
    let totalAmount = 0;
    const orderItems = await Promise.all(parsedItems.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product: ${item.productId}`);
      }
      totalAmount += product.price * item.quantity;

      // Update stock
      product.stock -= item.quantity;
      await product.save();
      
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      };
    }));

    // Create and save the order
    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      address: parsedAddress,
      contactNumber,
      additionalDetails,
      receiptImage: receiptImage ? [receiptImage] : []
    });
    await order.save();

    // Clear cart
    await addToCartModel.deleteMany({ userId });

    res.json({ success: true, message: 'Order created successfully', orderId: order._id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Error creating order' });
  }
};

module.exports = createOrder;