const nodemailer = require('nodemailer');

const sendVerificationEmail = (userEmail, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Email Verification',
    text: `Click on the link to verify your email: http://localhost:5000/verify/${token}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
