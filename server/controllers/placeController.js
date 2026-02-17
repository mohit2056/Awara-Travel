const Place = require('../models/Place');

// ======================================================
// 🛠️ Controller 1: Database Seed (Clear DB)
// ======================================================
const seedDatabase = async (req, res) => {
  try {
    await Place.deleteMany({}); 
    res.json({ message: "✅ Database Cleared! Ab sab saaf hai." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ======================================================
// 🛠️ Controller 2: Places Fetch (THE MAIN FIX 🔧)
// ======================================================
const getPlaces = async (req, res) => {
  try {
    const { type, search } = req.query;
    let filter = {};

    // Debugging ke liye (Terminal me dikhega kya search ho raha hai)
    console.log("\n🔍 Incoming Search:", search);

    // 1. Hidden Gem Filter
    if (type === 'hidden') {
      filter.isHiddenGem = true;
    }

    // 2. Search Logic
    if (search) {
      const searchTerm = search.toLowerCase().trim();

      // ⭐ SPECIAL CHECK: Agar 'Extreme' ya 'Adventure' word aaye
      if (searchTerm.includes('extreme') || searchTerm.includes('adventure')) {
         console.log("✅ Detection: User wants Extreme Sports!");
         
         // Hum check karenge ki category mein 'Extreme' ya 'Adventure' word ho
         filter.category = { $regex: 'Extreme|Adventure', $options: 'i' };
      } 
      // ⭐ NORMAL SEARCH
      else {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
          { mustTryDishes: { $regex: search, $options: 'i' } }, // Food search
          { moodTags: { $regex: search, $options: 'i' } } // Vibe search
        ];
      }
    }

    // Database Call
    console.log("🛠️ Filter Applied:", JSON.stringify(filter));
    
    // Sort by _id: -1 taaki naye cards sabse upar dikhein
    const places = await Place.find(filter).sort({ _id: -1 });
    
    console.log(`🎉 Found ${places.length} places to send.`);
    res.json(places);

  } catch (error) {
    console.error("❌ SERVER ERROR:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// ======================================================
// 🛠️ Controller 3: Single Place by ID
// ======================================================
const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).populate('owner', 'username email');
    if (!place) return res.status(404).json({ message: "Place not found." });
    res.json(place);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// ======================================================
// 🛠️ Controller 4: Create Place
// ======================================================
const createPlace = async (req, res) => {
  try {
    const { title, location, description, price, image, isHiddenGem, lat, lng, food } = req.body;

    if (!title || !location || !description || !price) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const foodArray = food ? food.split(',').map(item => item.trim()) : [];

    const newPlace = new Place({
      name: title,
      location: location,
      description: description,
      avgCost: Number(price),
      images: [image],
      photos: [image], // Backup field
      isHiddenGem: isHiddenGem,
      coordinates: { 
        lat: Number(lat) || 28.6139, 
        lng: Number(lng) || 77.2090 
      },
      moodTags: ["Explore"],
      mustTryDishes: foodArray,
      category: "General" // Default category
    });

    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// ======================================================
// 🎲 Controller 5: Random Place (Blind Date)
// ======================================================
const getRandomPlace = async (req, res) => {
  const { budget } = req.query;

  try {
    let filter = {};
    if (budget) {
        filter.avgCost = { $lte: Number(budget) };
    }

    const places = await Place.find(filter);

    if (places.length === 0) {
      return res.status(404).json({ message: "Budget thoda tight hai, kuch aur try karo! 😅" });
    }

    const randomIndex = Math.floor(Math.random() * places.length);
    const randomPlace = places[randomIndex];

    res.json(randomPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================================================
// ⭐ Controller 6: Reviews
// ======================================================
const createPlaceReview = async (req, res) => {
  const { rating, comment } = req.body;
  const user = req.user; 

  if (!user) return res.status(401).json({ message: "Login kar bhai pehle!" });

  try {
    const place = await Place.findById(req.params.id);

    if (place) {
      const alreadyReviewed = place.reviews.find(
        (r) => r.user.toString() === user._id.toString()
      );

      if (alreadyReviewed) {
        alreadyReviewed.rating = Number(rating);
        alreadyReviewed.comment = comment;
      } else {
        const review = {
          name: user.username || "User",
          rating: Number(rating),
          comment,
          user: user._id,
        };
        place.reviews.push(review);
        place.numReviews = place.reviews.length;
      }

      place.rating =
        place.reviews.reduce((acc, item) => item.rating + acc, 0) /
        place.reviews.length;

      await place.save();
      res.status(201).json({ message: 'Review Added/Updated' });
    } else {
      res.status(404).json({ message: 'Place not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ EXPORTS
module.exports = { 
    seedDatabase, 
    getPlaces, 
    getPlaceById, 
    createPlace, 
    getRandomPlace,
    createPlaceReview 
};