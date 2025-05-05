const User = require('../models/userModel'); 

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    const now = new Date();
  
    if (!user) {
      return res.status(404).json({ success: false, error: true, message: 'User not found' });
    }
  
    if (user.isVerified) {
      return res.status(400).json({ success: false, error: true, message: 'User already verified' });
    }
  
    if (user.otp !== otp || user.otpExpiresAt < now) {
      return res.status(400).json({ success: false, error: true, message: 'Invalid or expired OTP' });
    }
  
    // Mark user as verified and remove OTP info
    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    user.lastOTPSentAt = null;
    await user.save();
  
    res.status(200).json({
      success: true,
      error: false,
      message: 'Account verified successfully. You can now login.',
    });
  };