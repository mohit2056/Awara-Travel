const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const placeRoutes = require('./routes/placeRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/upload'); 

// Load environment variables
dotenv.config();

// ❌ Purana 'connectDB()' hata diya kyunki hum neeche manually connect kar rahe hain
// const connectDB = require('./config/db'); 

const app = express();
const port = process.env.PORT || 5000;

// ⭐ MIDDLEWARES
// 1. CORS: Deployment ke liye sabse safe setting (Allow All)
app.use(cors()); 
// Note: Jab frontend deploy ho jayega, tab hum ise specific domain par lock kar sakte hain.

// 2. Body Parsers
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// ⭐ ROUTES
app.use('/api/places', placeRoutes);
app.use('/api/users', authRoutes);
app.use('/api/upload', uploadRoutes);

// Root Route (Health Check for Render)
app.get('/', (req, res) => {
  res.send('API is running... Awara Server is Live! 🔥');
});

// ⭐ MONGODB CONNECTION (Production Safe)
// Render par hum sirf process.env.MONGO_URI use karenge
const DB_URI = process.env.MONGO_URI;

if (!DB_URI) {
    console.error("❌ Error: MONGO_URI .env file mein nahi mila!");
    // Crash mat karwana, bas error dikhana
}

mongoose.connect(DB_URI || 'mongodb://127.0.0.1:27017/awara_travel')
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    
    // Server tabhi start hoga jab DB connect ho jaye (Best Practice)
    app.listen(port, () => {
      console.log(`🚀 Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    // Process exit mat karwana taki Render restart try kar sake
  });

// ⭐ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});