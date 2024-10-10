const userModel = require('../../models/userModel');
const bcrypt = require('bcryptjs');

const resetPasswordController = async (req, res) => {
  try {
    console.log("Reset password request received");
    console.log("User from token:", req.user);
    
    const { password } = req.body;
    const userId = req.user?.id;

    console.log("User ID from token:", userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No user ID found' });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check password strength
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
  }
};

module.exports = resetPasswordController;