const express = require('express');
const router = express.Router();
const { seedDatabase, getPlaces } = require('../controllers/placeController');

// Define Routes
router.get('/seed-database', seedDatabase); // URL: /api/places/seed-database
router.get('/', getPlaces);                 // URL: /api/places

module.exports = router;