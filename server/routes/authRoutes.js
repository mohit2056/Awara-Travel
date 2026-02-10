const express = require('express');
const router = express.Router();
const { registerUser, authUser, toggleWishlist, getWishlist,updateWishlistNote } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// 👇 Register Route (Naya User)
router.post('/register', registerUser);

// 👇 Login Route (Purana User)
router.post('/login', authUser);

// ⭐ NEW ROUTES
router.post('/wishlist', protect, toggleWishlist); // Add/Remove
router.get('/wishlist', protect, getWishlist);     // View All

// 👇 NEW ROUTE FOR NOTES
router.put('/wishlist/note', protect, updateWishlistNote);

module.exports = router;