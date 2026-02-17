const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Place = require('./models/Place');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('🔥 Connected to MongoDB...');
    
    // 👇 Sirf Adventure aur Extreme Sports wala kachra udayega
    const result = await Place.deleteMany({ 
        category: { $in: ['Adventure', 'Extreme Sports'] } 
    });

    console.log(`✅ Deleted ${result.deletedCount} junk cards.`);
    console.log("Database is clean now.");
    process.exit();
  })
  .catch((err) => console.log(err));