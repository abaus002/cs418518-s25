const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Reset password request
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ error: "User not found" });

  const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Send reset link (using email utility)
  // sendResetEmail(email, resetToken);
  
  res.status(200).json({ message: 'Password reset link sent to your email.' });
};

// Change password
const changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;
  
  const user = await User.findOne({ email });
  
  if (!user || !(await user.comparePassword(currentPassword))) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  user.password_hash = newPassword;
  await user.save();

  res.status(200).json({ message: 'Password changed successfully' });
};

module.exports = { requestPasswordReset, changePassword };
