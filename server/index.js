const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Place = require('./models/place');  // Place model ko import kiya

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected via Mongoose! 🔥'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 🛠️ Test Route: Ek nakli data database mein daalne ke liye
app.get('/test-seed', async (req, res) => {
  try {
    const samplePlace = new Place({
      name: "Kasol - The Mini Israel",
      description: "Parvati Valley ke kinare basa ek shaant gaon. Yahan waqt tham sa jata hai.",
      location: "Kasol, Himachal Pradesh",
      images: ["https://example.com/kasol.jpg"], // Baad mein real images dalenge
      moodTags: ["Peace", "Spiritual", "Thrill"],
      isHiddenGem: false,
      avgCost: 5000,
      mustTryDishes: ["Manikaran Kulcha", "Rice Beer"],
      musicUrl: "https://example.com/ocean-sounds.mp3",
      audioGuideUrl: "https://example.com/kasol-guide.mp3"
    });

    await samplePlace.save(); // Database mein save kiya
    res.send("✅ Data Added Successfully! Tera Database mast kaam kar raha hai.");
  } catch (error) {
    res.status(500).send("❌ Error aa gaya: " + error.message);
  }
});

app.get('/', (req, res) => {
  res.send('Awara Backend is Running! 🚀');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});