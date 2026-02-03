const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true }, // e.g., "Kasol, Himachal"

  // Images
  images: [{ type: String }], // Array of image URLs

  // Feature 10: Mood-Based Discovery 
  moodTags: [{ 
    type: String, 
    enum: ['Peace', 'Party', 'Thrill', 'Romantic', 'Spiritual'] 
  }],

  // Feature 8: Hidden Gems vs Tourist Traps 
  isHiddenGem: { type: Boolean, default: false },

  // Feature 5: Sonic Trips (Audio Ambience) 
  musicUrl: { type: String }, // Background sound (ocean/forest)

  // Feature 2: Audio Guide 
  audioGuideUrl: { type: String }, // Voice narration

  // Feature 9: Kharcha Estimator 
  avgCost: { type: Number, required: true }, // Cost per person

  // Feature 4: Food Integration 
  mustTryDishes: [{ type: String }], // e.g., ["Manikaran Kulcha", "Rice Beer"]

  // Feature 7: Map Coordinates
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);