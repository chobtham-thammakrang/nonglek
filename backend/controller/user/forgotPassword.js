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
      from: '"น้องเล็ก ศาลพระภูมิ นครปฐม" <' + process.env.EMAIL_USER + '>',
      to: user.email,
      subject: 'OTP สำหรับเปลี่ยนรหัสผ่าน ร้าน น้องเล็ก ศาลพระภูมิ นครปฐม',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">OTP รีเซ็ตรหัสผ่าน</h2>
          <p>คุณได้ร้องขอให้รีเซ็ตรหัสผ่านของคุณ โปรดใช้ OTP ต่อไปนี้เพื่อดำเนินการต่อ:</p>
          <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 36px; font-weight: bold; color: #333; margin: 20px 0;">
            ${otp}
          </div>
          <p>OTP นี้จะหมดอายุใน 2 นาที.</p>
          <p>หากคุณไม่ได้ร้องขอ โปรดละเว้นอีเมลนี้ และรหัสผ่านของคุณจะไม่เปลี่ยนแปลง.</p>
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