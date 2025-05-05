const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name:  {type:String,required:true},
  otp: String,
  otpExpiresAt: Date,
  lastOTPSentAt: Date,
  password: String,
  isVerified: { type: Boolean, default: false }
},{
  timestamps : true
});

module.exports = mongoose.model('User', userSchema);