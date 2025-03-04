const express = require('express');
const { requestPasswordReset, changePassword } = require('../controllers/userController');

const router = express.Router();

router.post('/reset-password', requestPasswordReset);
router.post('/change-password', changePassword);

module.exports = router;
