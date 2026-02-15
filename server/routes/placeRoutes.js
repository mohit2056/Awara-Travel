const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // ✅ Middleware

// ✅ Controllers Import
const { 
    seedDatabase, 
    getPlaces, 
    getPlaceById, 
    createPlace, 
    getRandomPlace,
    createPlaceReview 
} = require('../controllers/placeController');

// --- Routes Definition ---

// 🛑 DANGER ZONE: Database Reset (Data Delete karne wala)
// Maine isse COMMENT (band) kar diya hai.
// Ab browser refresh karne se data nahi udega. 
// (Agar future mein sab delete karna ho, tabhi is "//" ko hatana)
// router.delete('/seed-database', seedDatabase); 

// 1. Blind Date / Random Place (Specific Route - ID se pehle aana chahiye) ✅
// Note: Frontend mein ab API call '/api/places/blind-date' hogi
router.get('/blind-date', getRandomPlace); 

// 2. Reviews Route (Login required)
router.route('/:id/reviews').post(protect, createPlaceReview);

// 3. General Routes (Get All / Create New)
router.route('/')
    .get(getPlaces)
    .post(createPlace);

// 4. Dynamic Routes (Jo ID lete hain) - INKO SABSE NEECHE RAKHO ✅
// Agar isse upar rakha toh 'blind-date' ko bhi ye ID samajh lega
router.get('/:id', getPlaceById);

module.exports = router;