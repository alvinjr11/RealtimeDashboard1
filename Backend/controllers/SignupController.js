const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { generateOTP } = require('../utils/otpUtils');
const { sendOTP } = require('../utils/mailUtil');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    if (existingUser.isVerified) {
      return res.status(400).json({
        success: false,
        error: true,
        message: 'User already exists. Please login.',
      });
    }

    // If not verified, resend OTP if 30 seconds have passed
    const now = Date.now();
    const lastSent = existingUser.lastOTPSentAt ? existingUser.lastOTPSentAt.getTime() : 0;

    if (now - lastSent < 30 * 1000) {
      const waitTime = Math.ceil((30 * 1000 - (now - lastSent)) / 1000);
      return res.status(429).json({
        success: false,
        error: true,
        message: `Please wait ${waitTime} seconds before resending OTP.`,
      });
    }

    // Resend OTP
    const newOTP = generateOTP();
    existingUser.otp = newOTP;
    existingUser.otpExpiresAt = new Date(now + 10 * 60 * 1000); // 10 mins
    existingUser.lastOTPSentAt = new Date(now);
    await existingUser.save();

    await sendOTP(email, newOTP);

    return res.status(200).json({
      success: true,
      error: false,
      message: 'OTP resent to your email.',
    });
  }

  // If user doesn't exist, create a new user and send OTP
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    otp,
    otpExpiresAt,
    lastOTPSentAt: new Date(),
  });

  await sendOTP(email, otp);

  res.status(200).json({
    success: true,
    error: false,
    message: 'User created. OTP sent to your email.',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};