const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // ✅ Middleware

// ✅ Controllers Import (Sab ek saath merge kar diye)
const { 
    seedDatabase, 
    getPlaces, 
    getPlaceById, 
    createPlace, 
    getRandomPlace,
    createPlaceReview 
} = require('../controllers/placeController');

// --- Routes Definition ---

// 1. Specific Routes (Jo fix naam wale hain) - INKO PEHLE RAKHO
// (Seed ko POST banaya taaki galti se browser refresh par database reset na ho)
router.get('/seed-database', seedDatabase);

// 2. Blind Date (Order Sahi hai! ✅)
// Isko /:id se upar hona zaroori hai
router.get('/blind-date', getRandomPlace); 

// 3. Reviews Route (Login required)
router.route('/:id/reviews').post(protect, createPlaceReview);

// 4. General Routes (Get All / Create New)
router.route('/').get(getPlaces).post(createPlace);

// 5. Dynamic Routes (Jo ID lete hain) - INKO SABSE NEECHE RAKHO ✅
router.get('/:id', getPlaceById);

module.exports = router;