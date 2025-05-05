const express = require('express');
const router = express.Router();
const { login } = require('../controllers/LoginController');
const { verifyOTP } = require('../controllers/verifyOtpController');
const { signup } = require('../controllers/SignupController');
const authToken = require('../middlewares/authMiddlewares');
const { getProfile } = require('../controllers/getProfile.Controller');

router.post('/signup', signup);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.get('/profile', authToken, getProfile);

module.exports = router;