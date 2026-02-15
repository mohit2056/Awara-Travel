const mongoose = require('mongoose');

// ---------------------------------------------------
// 1️⃣ REVIEW SCHEMA (Sub-document for Reviews)
// ---------------------------------------------------
const reviewSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true 
  },
  comment: { 
    type: String, 
    required: true 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // User model se link
  },
}, {
  timestamps: true, // CreatedAt automatically aa jayega
});

// ---------------------------------------------------
// 2️⃣ MAIN PLACE SCHEMA
// ---------------------------------------------------
const placeSchema = new mongoose.Schema({
  // 📝 Basic Details
  name: { 
    type: String, 
    required: [true, "Place name is required"] 
  },
  description: { 
    type: String, 
    required: [true, "Description is required"] 
  },
  location: { 
    type: String, 
    required: [true, "Location (City/State) is required"] 
  },

  // 💰 Budget (Important for Frontend)
  avgCost: { 
    type: Number, 
    required: [true, "Average Cost is required"] 
  },

  // 📍 Map Coordinates (Google Maps Link ke liye)
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },

  // 🖼️ Images (Array of URLs)
  images: [String], 

  // 🏷️ Discovery Tags (Peace, Party, Thrill, Spiritual)
  moodTags: [String],

  // 💎 Filter: Hidden Gems
  isHiddenGem: { 
    type: Boolean, 
    default: false 
  },

  // 🥘 Foodie Feature
  mustTryDishes: [String],

  // 🎵 Future Features (Audio/Music) - Optional rakh rahe hain abhi
  musicUrl: { type: String }, 
  audioGuideUrl: { type: String }, 

  // ⭐ Reviews & Ratings Calculation
  reviews: [reviewSchema], 
  
  rating: {
    type: Number,
    required: true,
    default: 0, // Average Rating (e.g. 4.5)
  },
  
  numReviews: {
    type: Number,
    required: true,
    default: 0, // Total reviews count
  },

}, { 
  timestamps: true 
});

module.exports = mongoose.model('Place', placeSchema);