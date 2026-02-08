const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');

// 👇 Register Route (Naya User)
router.post('/register', registerUser);

// 👇 Login Route (Purana User)
router.post('/login', authUser);

module.exports = router;