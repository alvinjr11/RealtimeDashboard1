const User = require('../models/userModel');

exports.getProfile = async (req, res) => {
  try {
    console.log("userId",req.userId)
    const user = await User.findById(req.userId);

    res.status(200).json({
      success: true,
      error: false,
      data: user,
    });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({
      success: false,
      error: true,
      message: 'Server error',
    });
  }
};