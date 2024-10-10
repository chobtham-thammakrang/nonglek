const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

const verifyOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.resetPasswordOTP !== otp || user.resetPasswordOTPExpires < Date.now()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET_KEY, { expiresIn: '15m' });

    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpires = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'OTP verified successfully', token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
  }
};

module.exports = verifyOTPController;
