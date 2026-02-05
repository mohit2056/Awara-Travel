const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const placeRoutes = require('./routes/placeRoutes'); // ✅ Routes import kiye

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes ko connect karo
app.use('/api/places', placeRoutes); // ✅ Ab saare URL '/api/places' se shuru honge

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected via Mongoose! 🔥'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});