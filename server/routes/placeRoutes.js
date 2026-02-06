const express = require('express');
const router = express.Router();
const { seedDatabase, getPlaces,getPlaceById } = require('../controllers/placeController');

// Define Routes
router.get('/seed-database', seedDatabase); // URL: /api/places/seed-database
router.get('/', getPlaces);                 // URL: /api/places
router.get('/:id', getPlaceById);            // URL: /api/places/:id
module.exports = router;

