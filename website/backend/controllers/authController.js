const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/emailUtils');
const jwt = require('jsonwebtoken');

// Register new user
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if email is already in use
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ error: "Email already registered" });

  const newUser = new User({ email, password_hash: password });

  // Generate email verification token
  const emailToken = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Save user to DB
  await newUser.save();

  // Send verification email
  await sendVerificationEmail(email, emailToken);

  res.status(201).json({ message: 'User registered. Please check your email to verify your account.' });
};

// Verify email
const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    user.is_verified = true;
    await user.save();
    
    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { registerUser, verifyEmail };
