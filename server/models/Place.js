const mongoose = require('mongoose');

// 1. Review Schema (Ek alag chhota schema reviews ke liye)
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // User ID se link kiya taaki pata chale kisne review diya
  },
}, {
  timestamps: true,
});

// 2. Main Place Schema
const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true }, 

  // coordinates for map feature
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },

  // Images
  images: [{ type: String }], 

  // Feature 10: Mood-Based Discovery 
  moodTags: [{
    type: String,
    enum: ['Peace', 'Party', 'Thrill', 'Romantic', 'Spiritual', 'Family']
  }],

  // Feature 8: Hidden Gems vs Tourist Traps 
  isHiddenGem: { type: Boolean, default: false },

  // Feature 5: Sonic Trips (Audio Ambience) 
  musicUrl: { type: String }, 

  // Feature 2: Audio Guide 
  audioGuideUrl: { type: String }, 

  // Feature 9: Kharcha Estimator 
  avgCost: { type: Number, required: true }, 

  // Feature 4: Food Integration 
  mustTryDishes: [{ type: String }],

  // 🌟 NEW: Reviews & Ratings Section (Added for Day 11)
  reviews: [reviewSchema], // Upar wala schema yahan list banega
  rating: {
    type: Number,
    required: true,
    default: 0, // Average Rating (e.g., 4.5)
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0, // Total kitne logon ne review diya
  },

}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);