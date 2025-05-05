const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Send an OTP to the user's email.
 * @param {string} email - Recipient's email.
 * @param {string} otp - The OTP code to send.
 */
exports.sendOTP = async (email, otp) => {
  const mailOptions = {
    from: `"Dashboard Auth" <${process.env.MAIL_USER}>`,
    to: email,
    subject: 'Your OTP Code',
    html: `<h3>Your OTP is: <strong>${otp}</strong></h3><p>It expires in 10 minutes.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (err) {
    console.error('Error sending OTP:', err);
    throw new Error('Failed to send OTP');
  }
};

