const express = require('express');
const router = express.Router();

// ✅ 1. Sab kuch EK HI LINE mein import karo (Duplicate hata diye)
const { 
    seedDatabase, 
    getPlaces, 
    getPlaceById, 
    createPlace, 
    getRandomPlace 
} = require('../controllers/placeController');

// --- Routes Definition ---

// 1. Specific Routes (Jo fix naam wale hain) - INKO PEHLE RAKHO
router.get('/seed-database', seedDatabase);
router.get('/blind-date', getRandomPlace); // ✅ Isko /:id se upar hona zaroori hai

// 2. General Routes (Jo list dikhate hain)
router.route('/').get(getPlaces).post(createPlace);

// 3. Dynamic Routes (Jo ID lete hain) - INKO SABSE NEECHE RAKHO
// Agar ye upar hota, to 'blind-date' ko bhi ye ID samajh leta!
router.get('/:id', getPlaceById);

module.exports = router;