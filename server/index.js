const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const placeRoutes = require('./routes/placeRoutes');
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ⭐ MIDDLEWARES (Clean & Powerful)
// 1. CORS: Sabse upar aur sabse simple rakho (Sab allowed)
app.use(cors()); 

// 2. Body Parsers
app.use(express.json()); // JSON data padhne ke liye
app.use(express.urlencoded({ extended: true })); // Form data ke liye

// ⭐ ROUTES
app.use('/api/places', placeRoutes);
app.use('/api/users', authRoutes);

// Root Route (Testing)
app.get('/', (req, res) => {
  res.send('API is running... Awara Server is Live! 🔥');
});

// ⭐ MONGODB CONNECTION
// Note: Agar .env kaam na kare toh wapas 'mongodb://127.0.0.1:27017/awara_travel' likh dena
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/awara_travel')
  .then(() => {
    console.log('MongoDB Connected via Mongoose! 🔥');
    
    // Server start only after DB connects
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
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