const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  // 👇 Tere data ke hisaab se EXACT fields
  name: { 
    type: String, 
    required: true 
  },
  
  description: { 
    type: String 
  },
  
  location: { 
    type: String, 
    required: true 
  },

  // 📍 Coordinates Object (Jaisa tere data me hai)
  coordinates: {
    lat: Number,
    lng: Number
  },

  // 🖼️ Images Array (Tere data me 'images' hai)
  images: [String], 

  // 🏷️ Tags
  moodTags: [String],
  
  isHiddenGem: { 
    type: Boolean, 
    default: false 
  },

  // 💰 PRICE MATCH: Tere data me 'avgCost' hai (11998)
  avgCost: { 
    type: Number, 
    required: true 
  },

  // 🥘 Food
  mustTryDishes: [String],

  // ⭐ Rating & Reviews
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: String,
      rating: Number,
      comment: String,
    }
  ],

  // 👤 Owner Link
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

}, { 
  timestamps: true, // createdAt, updatedAt apne aap aa jayega
  strict: false     // 🚨 SAFETY: Agar koi extra field hua to error nahi dega
});

module.exports = mongoose.model('Place', placeSchema);