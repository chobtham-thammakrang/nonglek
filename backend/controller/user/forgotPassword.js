const userModel = require('../../models/userModel');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set OTP and expiry (2 minutes from now)
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpires = Date.now() + 120000; // 2 minutes
    await user.save();

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: '"Nonglek Spirit House" <' + process.env.EMAIL_USER + '>',
      to: user.email,
      subject: 'OTP สำหรับเปลี่ยนรหัสผ่าน ร้าน น้องเล็ก ศาลพระภูมิ นครปฐม',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset OTP</h2>
          <p>You have requested to reset your password. Please use the following OTP to proceed:</p>
          <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 36px; font-weight: bold; color: #333; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP will expire in 2 minutes.</p>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
  }
};

module.exports = forgotPassword