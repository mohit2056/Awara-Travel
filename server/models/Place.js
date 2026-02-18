const mongoose = require('mongoose');

// ---------------------------------------------------
// 1️⃣ REVIEW SCHEMA (Sub-document)
// ---------------------------------------------------
const reviewSchema = new mongoose.Schema({
  name: { type: String },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// ---------------------------------------------------
// 2️⃣ MAIN PLACE SCHEMA
// ---------------------------------------------------
const placeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"] 
  },
  description: { 
    type: String 
  },
  location: { 
    type: String, 
    required: [true, "Location is required"] 
  },

  // 📍 Coordinates (Object matching your data)
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },

  // 🖼️ Images (Array of strings)
  images: [String], 

  // 🏷️ Tags (Peace, Thrill, etc.)
  moodTags: [String],

  // 💎 Filter
  isHiddenGem: { 
    type: Boolean, 
    default: false 
  },

  // 💰 Budget Match (Exact field: avgCost)
  avgCost: { 
    type: Number, 
    required: [true, "Average Cost is required"] 
  },

  // 🥘 Food
  mustTryDishes: [String],

  // ⭐ Ratings & Reviews
  reviews: [reviewSchema], 
  
  rating: {
    type: Number,
    default: 0,
  },
  
  numReviews: {
    type: Number,
    default: 0,
  },

}, { 
  timestamps: true, // createdAt and updatedAt automatic handles
  strict: false     // Taaki agar koi extra field ho to crash na ho
});

module.exports = mongoose.model('Place', placeSchema);