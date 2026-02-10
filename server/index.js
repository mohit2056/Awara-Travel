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

// ⭐ MIDDLEWARES (Inka order zaroori hai)
app.use(cors()); // Doosre origins se request allow karne ke liye
app.use(express.json()); // JSON body parse karne ke liye (Ye zaroori hai email error fix karne ke liye)
app.use(express.urlencoded({ extended: true })); // Form-data handle karne ke liye

// ⭐ ROUTES
app.use('/api/places', placeRoutes);
app.use('/api/users', authRoutes);

// Root Route (Testing ke liye)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ⭐ MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected via Mongoose! 🔥');
    // Connection ke baad hi server start karna better practice hai
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Error aane par process stop kar do
  });

// ⭐ GLOBAL ERROR HANDLER (Ye aapko undefined body wale errors se bachayega)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});
